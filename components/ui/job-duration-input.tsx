import { ControllerRenderProps } from "react-hook-form";

import { JobDurationList } from "@/common/data/job-duration-list";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface JobDurationInputProps {
  field: ControllerRenderProps;
}

export const JobDurationInput = ({ field }: JobDurationInputProps) => {
  return (
    <RadioGroup
      value={field.value?.toString()}
      onValueChange={(value) => field.onChange(parseInt(value))}
      disabled={field.disabled}
    >
      {JobDurationList.map((duratoin) => (
        <div key={duratoin.days} className="flex items-center gap-3">
          <RadioGroupItem
            id={duratoin.days.toString()}
            value={duratoin.days.toString()}
          />
          <Label className="flex flex-col cursor-pointer">
            {duratoin.days} hari
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
