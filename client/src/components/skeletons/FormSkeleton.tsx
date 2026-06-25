"use client";

import { Skeleton } from "@/components/ui/skeleton";

type FormSkeletonProps = {
    rows?: number[];
    showSubmit?: boolean;
};

export default function FormSkeleton({
    rows = [1],
    showSubmit = true,
}: FormSkeletonProps) {
    return (
        <div className="space-y-4">
            {rows.map((fieldCount, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: `repeat(${fieldCount}, minmax(0, 1fr))`,
                    }}
                >
                    {Array.from({ length: fieldCount }).map((_, fieldIndex) => (
                        <div key={fieldIndex} className="space-y-2">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-9 w-full" />
                        </div>
                    ))}
                </div>
            ))}

            {showSubmit && <Skeleton className="h-9 w-full" />}
        </div>
    );
}
