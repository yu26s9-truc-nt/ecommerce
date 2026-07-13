"use client";

import { KeyboardEvent, useState } from "react";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type TagInputProps = {
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
};

const TagInput = ({ value, onChange, placeholder, disabled }: TagInputProps) => {
    const [input, setInput] = useState("");

    const addTag = () => {
        const tag = input.trim();

        if (!tag) return;

        if (value.some((v) => v.toLowerCase() === tag.toLowerCase())) {
            setInput("");
            return;
        }

        onChange([...value, tag]);
        setInput("");
    };

    const removeTag = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        }

        if (e.key === "Backspace" && input === "" && value.length > 0) {
            removeTag(value.length - 1);
        }
    };

    return (
        <div className="flex min-h-11 h-auto flex-wrap items-center gap-2 px-3 py-2 w-full h-12 rounded-xl border-2 border-input bg-background text-[0.9rem] font-medium placeholder:text-muted-foreground shadow-sm transition-colors duration-150 outline-none focus:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium">
            {value.map((tag, index) => (
                <Badge key={`${tag}-${index}`} variant="secondary" className="gap-1 rounded-md px-2 py-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(index)} disabled={disabled} className="rounded-sm hover:bg-muted">
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}

            <Input
                className="h-7 flex-1 border-0 p-0 shadow-none focus-visible:ring-0 rounded-none"
                value={input}
                disabled={disabled}
                placeholder={placeholder}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                onBlur={addTag}
            />
        </div>
    );
};

export default TagInput;
