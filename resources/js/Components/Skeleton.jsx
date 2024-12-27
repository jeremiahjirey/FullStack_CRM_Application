import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[100px] min-w-[130px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 min-w-[100px]" />
                <Skeleton className="h-4 min-w-[100px]" />
            </div>
        </div>
    );
}
