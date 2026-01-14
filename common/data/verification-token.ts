import { prismadb } from "@/common/libs/prismadb";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const response = await prismadb.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return response;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const response = await prismadb.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return response;
  } catch {
    return null;
  }
};
