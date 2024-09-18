import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Area, getAreaString } from "@/lib/area-list";

interface AreaCardProps {
  area: Area;
  isSelected: boolean;
}

export function AreaCard({ area, isSelected }: AreaCardProps) {
  return (
    <Label
      key={area.label}
      htmlFor={area.label}
      className={`
          relative flex cursor-pointer flex-col items-center justify-between rounded-md bg-popover p-4 font-semibold leading-normal ring-1 ring-border
          hover:bg-accent hover:text-accent-foreground
          has-[:checked]:ring-2 has-[:checked]:ring-foreground
          [&>svg]:has-[:checked]:block
        `}
    >
      <div className="h-32 w-32">
        <Image
          src={area.imageUrl}
          alt={area.label}
          layout="responsive"
          objectFit="cover"
          width={128}
          height={128}
        />
      </div>

      <RadioGroupItem
        value={area.value.toString()}
        id={area.label}
        checked={isSelected}
        className="hidden"
      />
      <CircleCheck
        size={18}
        color="#fff"
        fill="#000"
        className="absolute right-0 top-0 hidden -translate-y-1/2 translate-x-1/2"
      />
      <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap break-words text-center">
        {getAreaString(area.label)}
      </span>
    </Label>
  );
}
