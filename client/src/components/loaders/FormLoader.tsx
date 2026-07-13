"use client";

import FormSkeleton from "@/components/skeletons/FormSkeleton";

type FormLoaderProps = {
    isLoading: boolean;
    skeletonRows?: number[];
    showSubmitSkeleton?: boolean;
    children: React.ReactNode;
};

export default function FormLoader({ isLoading, skeletonRows = [1], showSubmitSkeleton = true, children }: FormLoaderProps) {
    if (isLoading) {
        return <FormSkeleton rows={skeletonRows} showSubmit={showSubmitSkeleton} />;
    }

    return <>{children}</>;
}
