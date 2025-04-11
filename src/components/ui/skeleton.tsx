import { cn } from "@utils/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse  rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
