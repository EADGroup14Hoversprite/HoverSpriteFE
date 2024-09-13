import { RadioGroup } from "@/components/ui/radio-group";
import { Area } from "@/lib/area-list";
import { AreaCard } from "@/app/(farmer)/booking/_component/AreaCard";

interface AreaListProps {
  areaList: Area[];
  defaultArea: string;
  onAreaChange: (area: string) => void;
}
export function AreaList({
  areaList,
  onAreaChange,
  defaultArea,
}: AreaListProps) {
  return (
    <div className="w-full">
      <RadioGroup
        onValueChange={onAreaChange}
        defaultValue={defaultArea}
        className="-ml-1.5 flex flex-wrap items-center justify-start p-[1px] gap-0"
      >
        {areaList.map((area) => (
          <div
            key={area.label}
            className={`
                        w-1/2 space-y-0 p-2
                        sm:w-1/2
                        md:w-1/4
                      `}
          >
            <AreaCard
              isSelected={area.value === Number(defaultArea)}
              area={area}
            />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
