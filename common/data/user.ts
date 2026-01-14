import { prismadb } from "../libs/prismadb";

export const getUserByEmail = async (email: string) => {
  try {
    const response = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    return response;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await prismadb.user.findUnique({
      where: {
        id,
      },
    });

    return response;
  } catch {
    return null;
  }
};

export const isUserCompany = async (userId: string): Promise<boolean> => {
  const response = await prismadb.user.findFirst({
    where: {
      id: userId,
      userType: "COMPANY",
    },
  });

  return !!response;
};

export const isUserSeeker = async (userId: string): Promise<boolean> => {
  const response = await prismadb.user.findUnique({
    where: {
      id: userId,
      userType: "JOBSEEKER",
    },
  });
  return !!response;
};
