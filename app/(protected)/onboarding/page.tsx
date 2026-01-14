import { prismadb } from "@/common/libs/prismadb";
import { requiredUser } from "@/common/utils/requiredUser";
import { OnboardingForm } from "@/components/forms/onboarding/onboarding-form";
import { redirect } from "next/navigation";

const UserIsOnboarding = async (userId: string) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onboardingComplete: true,
    },
  });

  if (user?.onboardingComplete) {
    redirect("/");
  }

  return user;
};

const OnboardingPage = async () => {
  const session = await requiredUser();

  await UserIsOnboarding(session.id as string);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  );
};

export default OnboardingPage;
