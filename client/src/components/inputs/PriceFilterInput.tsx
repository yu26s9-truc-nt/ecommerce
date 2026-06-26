"use client";

import { SlidersHorizontal, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PriceRange = {
    min: number;
    max: number;
};

type PriceFilterProps = {
    min?: number;
    max?: number;
    value?: PriceRange;
    onChange?: (value: PriceRange) => void;
    onReset?: () => void;
    className?: string;
    currency?: string;
};

export default function PriceFilter({
    min = 0,
    max = 100,
    value,
    onChange,
    onReset,
    className = "",
    currency = "$",
}: PriceFilterProps) {
    const isControlled = value !== undefined;

    const [internalRange, setInternalRange] = React.useState<PriceRange>({
        min,
        max,
    });

    const range = isControlled ? value : internalRange;

    const clamp = (n: number, low: number, high: number) =>
        Math.min(Math.max(n, low), high);

    const updateRange = (next: PriceRange) => {
        const normalized = {
            min: clamp(Math.min(next.min, next.max), min, max),
            max: clamp(Math.max(next.min, next.max), min, max),
        };

        if (!isControlled) {
            setInternalRange(normalized);
        }

        onChange?.(normalized);
    };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nextMin = Number(e.target.value || 0);
        updateRange({ min: nextMin, max: range.max });
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nextMax = Number(e.target.value || 0);
        updateRange({ min: range.min, max: nextMax });
    };

    const reset = () => {
        const next = { min, max };

        if (!isControlled) {
            setInternalRange(next);
        }

        onReset?.();
        onChange?.(next);
    };

    return (
        <div
            className={`rounded-2xl border bg-card p-4 shadow-sm ${className}`}
        >
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="size-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Price filter</h3>
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground"
                    onClick={reset}
                >
                    <X className="mr-1 size-4" />
                    Reset
                </Button>
            </div>

            <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                    {currency}
                    {range.min.toFixed(2)}
                </span>
                <span>
                    {currency}
                    {range.max.toFixed(2)}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                        Min
                    </label>
                    <Input
                        type="number"
                        min={min}
                        max={max}
                        step="0.01"
                        value={range.min}
                        onChange={handleMinChange}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                        Max
                    </label>
                    <Input
                        type="number"
                        min={min}
                        max={max}
                        step="0.01"
                        value={range.max}
                        onChange={handleMaxChange}
                    />
                </div>
            </div>
        </div>
    );
}
