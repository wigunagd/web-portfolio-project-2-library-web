import { Skeleton } from "@/components/ui/skeleton"; 

const CartItemSkeleton = () => {
    return (
        <div className="flex flex-row w-full items-start gap-2 animate-pulse">
            <Skeleton className="h-4 w-4 mt-1" />

            <div className="relative flex w-full gap-4">
                <Skeleton className="h-26.5 w-20 md:h-34.5 md:w-26" />
                <div className="flex flex-col justify-center gap-2 w-full">
                    <Skeleton className="h-5 w-20 rounded-sm" />
                    <Skeleton className="h-6 w-3/4 rounded" /> 
                    <Skeleton className="h-4 w-1/2 rounded" /> 
                </div>
                <div className="absolute top-0 right-0">
                    <Skeleton className="h-10 w-10 rounded-md" />
                </div>
            </div>
        </div>
    );
};

export default CartItemSkeleton;