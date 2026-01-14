/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "./button";

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  disabled?: boolean;
  label: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
  disabled,
  label,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="lhqfreqh">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              disabled={disabled}
              type="button"
              variant={"secondary"}
              onClick={onClick}
              className="w-fit"
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              {`${value.length === 0 ? "Tambahkan" : "Ganti"} ${label}`}
            </Button>
          );
        }}
      </CldUploadWidget>
      {value && (
        <div className="scroll-smooth snap-x snap-mandatory">
          <div className="my-2 flex items-center gap-4">
            {value.map((url) => (
              <div
                key={url}
                className="relative h-[100px] w-auto aspect-3/4 rounded-md shrink-0"
              >
                <div className="z-30 absolute -top-1 -right-2">
                  <Button
                    type="button"
                    onClick={() => onRemove(url)}
                    variant={"destructive"}
                    size={"icon"}
                    className="size-5"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Image
                  fill
                  sizes="80px"
                  src={url}
                  alt="Image"
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
