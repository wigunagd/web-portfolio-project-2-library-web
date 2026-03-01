import { Skeleton } from "@/components/ui/skeleton";

export const DetailBookSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-6 p-4">
      <Skeleton className="h-4 w-48" />

      <div className="flex flex-col md:flex-row gap-9">
        
        <div className="flex w-full md:w-1/3 max-w-84.25 h-[400px] md:h-[500px]">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>

        <div className="flex flex-col w-full md:w-2/3 max-w-206.75 gap-5">
          
          <div className="flex flex-col w-full gap-5.5">
            <Skeleton className="h-6 w-24 rounded-sm" /> 
            <Skeleton className="h-10 w-3/4" />          
            <Skeleton className="h-6 w-40" />        
            <Skeleton className="h-6 w-20" />           
          </div>

          <div className="flex w-full gap-5">
            <Skeleton className="h-16 w-20" />
            <Skeleton className="h-16 w-20" />
            <Skeleton className="h-16 w-20" />
          </div>

          <div className="border-b w-full max-w-140" />

          <div className="flex flex-col w-full gap-2">
            <Skeleton className="h-8 w-32" />          
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-18 px-4 flex items-center bg-white md:relative md:h-fit md:px-0">
        <div className="grid grid-cols-2 md:flex gap-3 w-full">
          <Skeleton className="rounded-full w-full md:max-w-50 h-12" />
          <Skeleton className="rounded-full w-full md:max-w-50 h-12" />
        </div>
      </div>
    </div>
  );
};