export interface Area {
  label: string;
  value: number;
  imageUrl: string;
}

export function getAreaList() {
  return [
    {
      label: "smallArea",
      value: 1,
      imageUrl: "/area/small-area.png",
    },
    {
      label: "area",
      value: 10,
      imageUrl: "/area/area.png",
    },
    {
      label: "mediumArea",
      value: 100,
      imageUrl: "/area/medium-area.png",
    },
    {
      label: "vastArea",
      value: 1000,
      imageUrl: "/area/vast-area.png",
    },
  ] as Area[];
}
