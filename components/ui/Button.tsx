import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  icon?: IconName;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

const BASE =
  "inline-flex h-56 cursor-pointer items-center gap-8 whitespace-nowrap rounded-full px-32 text-body-l transition-colors duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-dark hover:bg-btn-hover",
  ghost: "bg-ghost text-primary hover:bg-ghost-hover",
};

export function Button({
  variant = "primary",
  icon,
  href,
  type = "button",
  className,
  onClick,
  children,
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]}${className ? ` ${className}` : ""}`;

  const content = (
    <>
      {icon && <Icon name={icon} size={16} />}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}