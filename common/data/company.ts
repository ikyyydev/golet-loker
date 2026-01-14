import { notFound, redirect } from "next/navigation";
import { prismadb } from "@/common/libs/prismadb";

export const getCompanyByUser = async (userId: string) => {
  const response = await prismadb.company.findUnique({
    where: {
      userId,
    },
    select: {
      name: true,
      about: true,
      location: true,
      website: true,
      logo: true,
    },
  });

  if (!response) {
    return redirect("/");
  }

  return response;
};

export const getJobs = async (userId: string) => {
  const response = await prismadb.jobPost.findMany({
    where: {
      company: {
        userId,
      },
    },
    select: {
      id: true,
      jobTitle: true,
      status: true,
      createdAt: true,
      company: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response;
};

export const getJobEditData = async (jobId: string, userId: string) => {
  const response = await prismadb.jobPost.findUnique({
    where: {
      id: jobId,
      company: {
        userId,
      },
    },
    select: {
      id: true,
      benefits: true,
      jobTitle: true,
      jobDescription: true,
      sallaryFrom: true,
      sallaryTo: true,
      location: true,
      employmentType: true,
      listingDuration: true,
      company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
          website: true,
        },
      },
    },
  });

  if (!response) {
    return notFound();
  }

  return response;
};
