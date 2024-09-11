import { CropType } from "@/types/crop-type";

export interface Crop {
  label: string;
  value: CropType;
  imageUrl: string;
}

export function getCrops() {
  return [
    {
      label: "Fruit",
      value: CropType.FRUIT,
      imageUrl: "/crop/fruit.png",
    },
    {
      label: "Cereal",
      value: CropType.CEREAL,
      imageUrl: "/crop/barley.png",
    },
    {
      label: "Vegetable",
      value: CropType.VEGETABLE,
      imageUrl: "/crop/vegetable.png",
    },
  ] as Crop[];
}
