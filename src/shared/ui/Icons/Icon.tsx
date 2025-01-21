import React from "react";
import * as Icons from "./svg";

export const icons = {
  account: Icons.Account,
  bell: Icons.Bell,
  bellBadge: Icons.BellBadge,
  checkboxBlank: Icons.CheckboxBlank,
};

type IconProps = {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = "currentColor", className }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  return (
    <IconComponent size={size} color={color} className={className}/>
  );
};
