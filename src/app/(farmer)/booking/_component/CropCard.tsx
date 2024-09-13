import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Crop } from "@/lib/crop-list";
import Image from "next/image";
import { CircleCheck } from "lucide-react";

interface CropCardProps {
  crop: Crop;
}

export function CropCard({ crop }: CropCardProps) {
  return (
    <Label
      key={crop.label}
      htmlFor={crop.label}
      className={`
          relative flex cursor-pointer flex-col items-center justify-between rounded-md bg-popover p-4 font-semibold leading-normal ring-1 ring-border
          hover:bg-accent hover:text-accent-foreground
          has-[:checked]:ring-2 has-[:checked]:ring-foreground
          [&>svg]:has-[:checked]:block
        `}
    >
      <div className="h-32 w-32">
        <Image
          src={crop.imageUrl}
          alt={crop.label}
          layout="responsive"
          objectFit="cover"
          width={128}
          height={128}
        />
      </div>
      <RadioGroupItem value={crop.value} id={crop.label} className="hidden" />
      <CircleCheck
        size={18}
        color="#fff"
        fill="#000"
        className="absolute right-0 top-0 hidden -translate-y-1/2 translate-x-1/2"
      />
      <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap break-words text-center">
        {crop.label}
      </span>
    </Label>
  );
}
