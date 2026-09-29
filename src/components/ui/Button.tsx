import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "gold";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  gold: "btn-gold",
};

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

/** `magnetic-wrap` is always applied — MagneticButtons binds to it. */
export default function Button({
  href,
  variant = "primary",
  className = "",
  children,
}: ButtonProps) {
  const classes = `btn ${VARIANT_CLASS[variant]} magnetic-wrap ${className}`.trim();

  if (/^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
