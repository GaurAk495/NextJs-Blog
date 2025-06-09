import React from "react";

function container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`container mx-auto px-6, ${className}`}>{children}</div>
  );
}

export default container;
