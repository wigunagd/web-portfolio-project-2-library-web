import { Skeleton } from "@/components/ui/skeleton";

export const BookSkeleton = () => {
  return (
    <div className="flex flex-col w-full md:max-w-56 rounded-3xl shadow overflow-hidden">
      <Skeleton className="h-64 md:h-84 w-full rounded-t-3xl rounded-b-none" />
      <div className="flex flex-col p-4 gap-2">
        <Skeleton className="h-6 w-4/5" /> 
        <Skeleton className="h-4 w-1/2" /> 
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};