import { Skeleton } from "@/components/ui/skeleton";

const EditBookAdminFormSkeleton = () => {
    return (
        <div className="flex flex-col w-full gap-4">
            <div className="grid gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full rounded-xl" />
            </div>

            <div className="grid gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full rounded-xl" />
            </div>

            <div className="grid gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-xl border" />
            </div>

            <div className="grid gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-xl" />
            </div>

            <div className="grid gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-41.5 w-full rounded-xl" />
            </div>

            <div className="grid gap-2">
                <Skeleton className="h-4 w-14" />
                <div className="flex flex-col w-full min-h-36 border border-dashed rounded-xl px-6 py-4 items-center justify-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>

            <Skeleton className="h-12 w-full rounded-full" />
        </div>
    );
};

export default EditBookAdminFormSkeleton;