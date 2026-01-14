"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import UserTypeSelection from "@/components/forms/onboarding/user-type-form";
import { CompanyForm } from "@/components/forms/onboarding/company-form";
import { JobSeekerForm } from "@/components/forms/onboarding/jobseeker";

type UserSelectionType = "company" | "jobSeeker" | null;

export const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  const handleUserSelectionType = (type: UserSelectionType) => {
    setUserType(type);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserSelectionType} />;
      case 2:
        return userType === "company" ? <CompanyForm /> : <JobSeekerForm />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Golet<span className="text-primary">Loker</span>
        </h1>
      </div>

      <Card className="max-w-lg w-full">
        <CardContent>{renderStep()}</CardContent>
      </Card>
    </>
  );
};
