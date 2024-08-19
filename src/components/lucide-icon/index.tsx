import { icons, LucideProps } from "lucide-react";
import React from "react";

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

export default function LucideIcon({ name, ...props }: Readonly<IconProps>) {
  const CustomIcon = icons[name];

  return <CustomIcon {...props} />;
}
