import { cn } from "@/common/libs/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("mx-auto max-w-7xl px-4", className)}>{children}</div>
  );
};

export default Container;
