import { Skeleton } from "@/components/ui/skeleton";

export const BookCommentListSkeleton = () => {
  return (
    <div className="flex flex-col w-full p-4 gap-4 rounded-4xl shadow bg-white">
      <div className="flex flex-row w-full gap-3 items-center">
        <Skeleton className="w-15 h-15 md:w-20 md:h-20 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-32 md:w-48" />
          <Skeleton className="h-4 w-24 md:w-32" />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-4 h-4 rounded-full" />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
};