import { Skeleton } from "@/components/ui/skeleton";

export const AuthorSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-2">
      <Skeleton className="w-15 h-15 md:w-20 md:h-20 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-32 md:w-48" /> 
        <Skeleton className="h-4 w-20 md:w-24" /> 
      </div>
    </div>
  );
};