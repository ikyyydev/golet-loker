"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { request } from "@arcjet/next";

import arcjet, { detectBot, shield } from "@/common/utils/arcjet";
import { prismadb } from "@/common/libs/prismadb";
import { requiredUser } from "@/common/utils/requiredUser";
import { jobSeekerSchema } from "@/schemas/onboarding";
import { jobApplicationSchema } from "@/schemas/job";
import { revalidatePath } from "next/cache";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    }),
  )
  .withRule(
    detectBot({
      allow: [],
      mode: "LIVE",
    }),
  );

export const createJobSeeker = async (
  data: z.infer<typeof jobSeekerSchema>,
) => {
  const session = await requiredUser();

  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  if (!session) {
    return { error: "Unauthorized" };
  }

  const validateData = jobSeekerSchema.parse(data);

  await prismadb.user.update({
    where: {
      id: session.id,
    },
    data: {
      onboardingComplete: true,
      userType: "JOBSEEKER",
      jobSeeker: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
};

export const applyJob = async (
  jobId: string,
  data: z.infer<typeof jobApplicationSchema>,
) => {
  const session = await requiredUser();
  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  if (!session) {
    return { error: "Unauthorized" };
  }

  const validateData = jobApplicationSchema.parse(data);

  const dataJobSeeker = await prismadb.jobSeeker.findUnique({
    where: {
      userId: session.id,
    },
    select: {
      id: true,
    },
  });

  const existingApplication = await prismadb.jobApplication.findUnique({
    where: {
      jobSeekerId_jobPostId: {
        jobPostId: jobId,
        jobSeekerId: dataJobSeeker?.id as string,
      },
    },
  });

  if (existingApplication) {
    return { error: "Kamu sudah melamar di lowongan ini" };
  }

  await prismadb.jobApplication.create({
    data: {
      resume: validateData.resume,
      coverLetter: validateData.coverLetter,
      jobPostId: jobId,
      jobSeekerId: dataJobSeeker?.id as string,
    },
  });

  revalidatePath(`/jobs/${jobId}`);

  return { success: "Lamaran Terkirim" };
};
