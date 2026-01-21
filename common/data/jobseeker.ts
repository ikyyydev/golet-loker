import { prismadb } from "../libs/prismadb";

export const jobIsApplied = async (jobId: string, userId: string) => {
  // const session = await requiredUser()
  const dataJobSeeker = await prismadb.jobSeeker.findUnique({
    where: {
      userId,
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

  return !!existingApplication;
};
