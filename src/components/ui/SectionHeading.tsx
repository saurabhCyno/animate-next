import type { ReactNode } from "react";

type SectionHeadingProps = {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  subtitleClassName?: string;
};

export default function SectionHeading({
  label,
  title,
  subtitle,
  className = "",
  subtitleClassName = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {label ? <span className="section-label">{label}</span> : null}
      <h2 className="section-title">{title}</h2>
      {subtitle ? (
        <p className={`section-subtitle ${subtitleClassName}`.trim()}>{subtitle}</p>
      ) : null}
    </div>
  );
}
