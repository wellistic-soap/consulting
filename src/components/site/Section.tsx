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
        "py-14 sm:py-20",
        tone === "muted" && "bg-muted/60",
        tone === "primary" && "bg-primary text-primary-foreground",
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
  align = "left",
  className,
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("mb-8 max-w-2xl sm:mb-10", align === "center" && "mx-auto text-center", className)}>
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}
