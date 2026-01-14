/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, useController } from "react-hook-form";
import { Slider } from "./slider";
import { useState } from "react";
import { formatCurrency } from "@/common/libs/format-currency";

interface SallaryInputProps {
  control: Control<any>;
  minSallary: number;
  maxSallary: number;
  step: number;
}

export const SallaryInput = ({
  control,
  minSallary,
  maxSallary,
  step,
}: SallaryInputProps) => {
  const { field: fromField } = useController({
    name: "sallaryFrom",
    control,
  });

  const { field: toField } = useController({
    name: "sallaryTo",
    control,
  });

  const [range, setRange] = useState<[number, number]>([
    fromField.value || minSallary,
    toField.value || maxSallary / 2,
  ]);

  const handleValueChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(newRange);
    fromField.onChange(newRange[0]);
    toField.onChange(newRange[1]);
  };
  return (
    <div className="space-y-3">
      <Slider
        min={minSallary}
        max={maxSallary}
        value={range}
        step={step}
        onValueChange={handleValueChange}
      />

      <div className="flex justify-between">
        <span>{formatCurrency(range[0])}</span>{" "}
        <span>{formatCurrency(range[1])}</span>
      </div>
    </div>
  );
};
