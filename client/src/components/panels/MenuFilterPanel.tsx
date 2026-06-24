import { Search, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const categories = [
    { id: "coffee", name: "Coffee", icon: "☕" },
    { id: "donuts", name: "Donuts", icon: "🍩" },
    { id: "breakfast", name: "Breakfast", icon: "🥐" },
    { id: "sandwiches", name: "Sandwiches", icon: "🥪" },
    { id: "snacks", name: "Snacks", icon: "🥨" },
    { id: "drinks", name: "Cold Drinks", icon: "🥤" },
];

export default function MenuFilterPanel() {
    const activeCategory = "all";

    return (
        <section className="sticky top-[80px] z-30 border-b border-border bg-card/95 backdrop-blur">
            <div className="mx-auto max-w-6xl space-y-4 px-4 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            placeholder="Search the menu..."
                            className="h-12 pl-11"
                        />
                    </div>

                    <Select defaultValue="popular">
                        <SelectTrigger className="h-12 w-full rounded-full sm:w-64">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="popular">
                                <div className="flex items-center gap-2">
                                    <Star className="size-4 fill-current" />
                                    Most Popular
                                </div>
                            </SelectItem>

                            <SelectItem value="low-high">
                                Price: Low → High
                            </SelectItem>

                            <SelectItem value="high-low">
                                Price: High → Low
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-2 overflow-x-auto py-1">
                    <Button
                        size="sm"
                        variant={
                            activeCategory === "all" ? "primary" : "outline"
                        }
                    >
                        All
                    </Button>

                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            size="sm"
                            variant={
                                activeCategory === category.id
                                    ? "primary"
                                    : "outline"
                            }
                        >
                            <span>{category.icon}</span>
                            {category.name}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}
