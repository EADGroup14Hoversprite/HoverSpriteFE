import { RadioGroup } from "@/components/ui/radio-group";
import { Crop } from "@/lib/crop-list";
import { CropType } from "@/types/crop-type";
import { CropCard } from "@/app/[role]/(farmer)/booking/_component/crop-area/CropCard";

interface CropListProps {
  crops: Crop[];
  defaultCrop: CropType;
  onCropChange: (cropType: CropType) => void;
}
export function CropList({ crops, onCropChange, defaultCrop }: CropListProps) {
  return (
    <RadioGroup
      onValueChange={onCropChange}
      defaultValue={defaultCrop}
      className="-ml-1.5 flex flex-wrap items-center justify-start p-[1px] gap-0"
    >
      {crops.map((crop) => (
        <div
          key={crop.label}
          className={`
                        w-1/2 space-y-0 p-2
                        sm:w-1/2
                        md:w-1/4
                      `}
        >
          <CropCard crop={crop} />
        </div>
      ))}
    </RadioGroup>
  );
}
