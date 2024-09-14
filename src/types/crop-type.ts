export enum CropType {
  FRUIT = "FRUIT",
  CEREAL = "CEREAL",
  VEGETABLE = "VEGETABLE",
}

export const crops = [CropType.FRUIT, CropType.CEREAL, CropType.VEGETABLE];

const dictCropToString: Record<CropType, string> = {
  FRUIT: "Fruit",
  CEREAL: "Cereal",
  VEGETABLE: "Vegetable",
};

export function toCropString(CropType: CropType): string {
  return dictCropToString[CropType];
}
