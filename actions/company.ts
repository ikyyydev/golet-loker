"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { request } from "@arcjet/next";

import { companySchema } from "@/schemas/onboarding";
import { prismadb } from "@/common/libs/prismadb";
import { requiredUser } from "@/common/utils/requiredUser";
import arcjet, { detectBot, shield } from "@/common/utils/arcjet";
import { jobSchema } from "@/schemas/job";
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

export const createCompany = async (data: z.infer<typeof companySchema>) => {
  const session = await requiredUser();

  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  if (!session) {
    return { error: "Unauthorized" };
  }

  const validateData = companySchema.parse(data);

  await prismadb.user.update({
    where: {
      id: session.id,
    },
    data: {
      onboardingComplete: true,
      userType: "COMPANY",
      company: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
};

export const createJob = async (data: z.infer<typeof jobSchema>) => {
  const user = await requiredUser();
  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validateData = jobSchema.parse(data);

  const company = await prismadb.company.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!company?.id) {
    return redirect("/");
  }

  await prismadb.jobPost.create({
    data: {
      jobTitle: validateData.jobTitle,
      jobDescription: validateData.jobDescription,
      employmentType: validateData.employmentType,
      location: validateData.location,
      sallaryFrom: validateData.sallaryFrom,
      sallaryTo: validateData.sallaryTo,
      listingDuration: validateData.listingDuration,
      benefits: validateData.benefits,
      companyId: company.id,
    },
  });
};

export const saveJob = async (jobId: string) => {
  const user = await requiredUser();
  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  await prismadb.savedJobPost.create({
    data: {
      jobPostId: jobId,
      userId: user.id as string,
    },
  });

  revalidatePath(`/jobs/${jobId}`);
};

export const unSaveJob = async (saveJobPostId: string) => {
  const user = await requiredUser();
  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const data = await prismadb.savedJobPost.delete({
    where: {
      id: saveJobPostId,
      userId: user.id,
    },
    select: {
      jobPostId: true,
    },
  });

  revalidatePath(`/jobs/${data.jobPostId}`);
};

export const editJob = async (
  data: z.infer<typeof jobSchema>,
  jobId: string,
) => {
  const user = await requiredUser();
  const req = await request();
  const decision = await aj.protect(req);
  const validateData = jobSchema.parse(data);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  await prismadb.jobPost.update({
    where: {
      id: jobId,
      company: {
        userId: user.id,
      },
    },
    data: {
      jobTitle: validateData.jobTitle,
      jobDescription: validateData.jobDescription,
      employmentType: validateData.employmentType,
      location: validateData.location,
      sallaryFrom: validateData.sallaryFrom,
      sallaryTo: validateData.sallaryTo,
      listingDuration: validateData.listingDuration,
      benefits: validateData.benefits,
      company: {
        update: {
          location: validateData.companyLocation,
        },
      },
    },
  });
};

export const changeIsActive = async (jobId: string) => {
  const session = await requiredUser();
  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const jobIsActive = await prismadb.jobPost.findFirst({
    where: {
      id: jobId,
      company: {
        userId: session.id,
      },
      status: "ACTIVE",
    },
  });

  if (jobIsActive) {
    return { error: "Lowongan sudah aktif" };
  }

  await prismadb.jobPost.update({
    where: {
      id: jobId,
      company: {
        userId: session.id,
      },
    },
    data: {
      status: "ACTIVE",
    },
  });

  return { success: "Lowongan berhasil di posting" };
};

export const changeIsExpired = async (jobId: string) => {
  const session = await requiredUser();
  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const jobIsExpired = await prismadb.jobPost.findFirst({
    where: {
      id: jobId,
      company: {
        userId: session.id,
      },
      status: "EXPIRED",
    },
  });

  if (jobIsExpired) {
    return { error: "Lowongan sudah berakhir" };
  }

  await prismadb.jobPost.update({
    where: {
      id: jobId,
      company: {
        userId: session.id,
      },
    },
    data: {
      status: "EXPIRED",
    },
  });

  return { success: "Lowongan telah di nonaktifkan" };
};

export const deleteJob = async (jobId: string) => {
  const session = await requiredUser();
  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  await prismadb.jobPost.delete({
    where: {
      id: jobId,
      company: {
        userId: session.id,
      },
    },
  });
};
