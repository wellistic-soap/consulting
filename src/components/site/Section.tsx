import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "muted" | "primary";
  as?: "section" | "div";
};

export function Section({ id, children, className, tone = "default", as: Tag = "section" }: Props) {
  return (
    <Tag
      id={id}
      className={cn(
        "section-pad",
        tone === "muted" && "bg-muted/60",
        tone === "primary" && "grid-bg-dark bg-primary text-primary-foreground",
        className,
      )}
    >
      <div className="container-site">{children}</div>
    </Tag>
  );
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "left",
  className,
  onDark = false,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow mb-3", onDark && "text-white/85")}>{eyebrow}</p>}
      <h2 className="text-[clamp(32px,3.6vw,48px)] font-semibold leading-[1.06] tracking-[-0.03em]">{title}</h2>
      {subtitle && (
        <p className={cn("mt-4 text-[clamp(17px,1.4vw,20px)] leading-normal text-pretty", onDark ? "text-white/80" : "text-muted-foreground")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
