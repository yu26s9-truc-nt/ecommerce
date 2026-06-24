import { Button } from "@/components/ui/button";
import ProductCard from "@/components/cards/ProductCard";
import HeroPanel from "@/components/panels/HeroPanel";
import MenuFilterPanel from "@/components/panels/MenuFilterPanel";
import { mockProducts } from "@/components/panels/ProductsPanel";
import ProductsPanel from "@/components/panels/ProductsPanel";

export default function Home() {
    return (
        <>
            <HeroPanel />
            <MenuFilterPanel />
            <ProductsPanel items={mockProducts} filter="all" />
        </>
    );
}
