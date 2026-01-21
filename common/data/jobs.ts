import { notFound } from "next/navigation";
import { prismadb } from "../libs/prismadb";
import { JobPostStatus } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";

export const getJobsIsActive = async ({
  page = 1,
  pageSize = 10,
  jobTypes = [],
  location = "",
  search = "",
}: {
  page: number;
  pageSize: number;
  jobTypes: string[];
  location: string;
  search: string;
}) => {
  const skip = (page - 1) * pageSize;

  const keywords = search.trim().split(/\s+/).filter(Boolean);

  const where: Prisma.JobPostWhereInput = {
    status: JobPostStatus.ACTIVE,
    ...(jobTypes.length > 0 && { employmentType: { in: jobTypes } }),
    ...(location && {
      location: {
        contains: location,
        mode: Prisma.QueryMode.insensitive,
      },
    }),
    ...(keywords.length && {
      AND: keywords.map<Prisma.JobPostWhereInput>((word) => ({
        jobTitle: {
          contains: word,
          mode: Prisma.QueryMode.insensitive,
        },
      })),
    }),
  };

  const [data, totalCount] = await Promise.all([
    prismadb.jobPost.findMany({
      where: where,
      take: pageSize,
      skip: skip,
      select: {
        id: true,
        jobTitle: true,
        jobDescription: true,
        sallaryFrom: true,
        sallaryTo: true,
        location: true,
        employmentType: true,
        createdAt: true,
        company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prismadb.jobPost.count({
      where,
    }),
  ]);

  return { jobs: data, totalPage: Math.ceil(totalCount / pageSize) };
};

export const getJobsIsActiveByJobId = async (
  jobId: string,
  userId?: string,
) => {
  const [jobData, savedJob] = await Promise.all([
    await prismadb.jobPost.findUnique({
      where: {
        status: "ACTIVE",
        id: jobId,
      },
      select: {
        id: true,
        jobTitle: true,
        jobDescription: true,
        sallaryFrom: true,
        sallaryTo: true,
        location: true,
        employmentType: true,
        listingDuration: true,
        benefits: true,
        createdAt: true,
        company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
    }),

    userId
      ? prismadb.savedJobPost.findUnique({
          where: {
            userId_jobPostId: {
              userId: userId,
              jobPostId: jobId,
            },
          },
          select: {
            id: true,
          },
        })
      : null,
  ]);

  if (!jobId) {
    return notFound();
  }

  return { jobData, savedJob };
};

export const getSavedJob = async (userId: string) => {
  const data = await prismadb.savedJobPost.findMany({
    where: {
      userId,
    },
    select: {
      jobPost: {
        select: {
          id: true,
          jobTitle: true,
          jobDescription: true,
          sallaryFrom: true,
          sallaryTo: true,
          location: true,
          employmentType: true,
          createdAt: true,
          company: {
            select: {
              name: true,
              logo: true,
              location: true,
              about: true,
            },
          },
        },
      },
    },
  });

  return data;
};

export const getNewJob = async () => {
  const data = await prismadb.jobPost.findMany({
    where: {
      status: "ACTIVE",
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 15)),
      },
    },
    select: {
      id: true,
      jobTitle: true,
      jobDescription: true,
      sallaryFrom: true,
      sallaryTo: true,
      location: true,
      employmentType: true,
      createdAt: true,
      company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};
