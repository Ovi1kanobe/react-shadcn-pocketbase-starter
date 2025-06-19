import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

function PageContainer({ children, className, ...props }: PageContainerProps) {
  return (
    <div className={cn("flex flex-col h-full w-full", className)} {...props}>
      {children}
    </div>
  );
}

export default PageContainer;
