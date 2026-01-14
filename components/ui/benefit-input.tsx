import { ControllerRenderProps } from "react-hook-form";

import { benefits } from "@/common/data/benefits";

import { Badge } from "./badge";

interface BenefitInputProps {
  field: ControllerRenderProps;
}

export const BenefitInput = ({ field }: BenefitInputProps) => {
  const handleBenefit = (benefitId: string) => {
    const currentBenefits = field.value || [];

    const newBenefits = currentBenefits.includes(benefitId)
      ? currentBenefits.filter((id: string) => id !== benefitId)
      : [...currentBenefits, benefitId];

    field.onChange(newBenefits);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {benefits.map((benefit) => {
          const isSelected = (field.value || []).includes(benefit.id);

          return (
            <Badge
              key={benefit.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() => handleBenefit(benefit.id)}
              className="cursor-pointer transition-all hover:scale-105 ease-in duration-200 active:scale-95 text-sm px-4 py-1.5 rounded-full"
            >
              <span className="flex items-center gap-2">
                {benefit.icon}
                {benefit.label}
              </span>
            </Badge>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Dipilih: <span>{(field.value || []).length}</span>
      </div>
    </div>
  );
};
