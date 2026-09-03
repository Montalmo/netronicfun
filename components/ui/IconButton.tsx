import { Icon, type IconName } from "@/components/ui/Icon";

type IconButtonVariant = "primary" | "ghost" | "outline" | "outline-dark";

interface IconButtonProps {
  icon: IconName;
  label: string;
  variant?: IconButtonVariant;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

const BASE =
  "inline-flex h-56 w-56 shrink-0 cursor-pointer items-center justify-center rounded-[56px] transition-colors duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

const VARIANTS: Record<IconButtonVariant, string> = {
  primary: "bg-primary text-on-dark hover:bg-btn-hover",
  ghost: "bg-ghost text-primary hover:bg-ghost-hover",
  outline: "border border-line bg-transparent text-primary hover:bg-ghost",
  "outline-dark":
    "border border-on-dark-soft/40 bg-transparent text-on-dark hover:bg-on-dark/10",
};

export function IconButton({
  icon,
  label,
  variant = "outline",
  href,
  type = "button",
  className,
  onClick,
}: IconButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]}${className ? ` ${className}` : ""}`;

  const content = <Icon name={icon} size={24} />;

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className={classes} aria-label={label} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} aria-label={label} onClick={onClick}>
      {content}
    </button>
  );
}