"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { request } from "@arcjet/next";

import arcjet, { detectBot, shield } from "@/common/utils/arcjet";
import { prismadb } from "@/common/libs/prismadb";
import { requiredUser } from "@/common/utils/requiredUser";
import { jobSeekerSchema } from "@/schemas/onboarding";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      allow: [],
      mode: "LIVE",
    })
  );

export const createJobSeeker = async (
  data: z.infer<typeof jobSeekerSchema>
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
