import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
    return (
        <Card className="overflow-hidden shadow-[0_6px_18px_-10px_rgba(42,24,16,0.18)]">
            {/* Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Skeleton className="h-full w-full" />

                {/* Featured badge placeholder */}
                <Skeleton className="absolute left-3 top-3 h-6 w-24 rounded-full" />
            </div>

            <CardContent className="p-5">
                <CardHeader className="space-y-0 px-0">
                    {/* Title */}
                    <Skeleton className="h-5 w-3/4" />
                </CardHeader>

                {/* Description */}
                <div className="mt-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Price + button */}
                <div className="mt-3 flex items-center justify-between">
                    <Skeleton className="h-6 w-24" />
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCardSkeleton;
