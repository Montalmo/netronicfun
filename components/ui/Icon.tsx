const ICONS = {
  download: "icon-download",
  x: "icon-x",
  instagram: "icon-instagram",
  menu: "icon-menu",
  whatsapp: "icon-whatsapp",
} as const;

export type IconName = keyof typeof ICONS;

const SIZES = {
  24: "h-24 w-24",
  16: "h-16 w-16",
} as const;

export type IconSize = keyof typeof SIZES;

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`icon ${ICONS[name]} ${SIZES[size]}${className ? ` ${className}` : ""}`}
    />
  );
}