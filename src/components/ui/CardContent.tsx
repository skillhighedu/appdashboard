import React from "react";
import classNames from "classnames";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({
  children,
  className,
  ...props
}: CardContentProps) {
  return (
    <div className={classNames("p-5", className)} {...props}>
      {children}
    </div>
  );
}
