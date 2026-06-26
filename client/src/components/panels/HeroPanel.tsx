import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HeroPanel() {
    return (
        <section
            className="relative overflow-hidden"
            style={{
                background:
                    "linear-gradient(135deg, #DA1884 0%, #FF4FB0 60%, #FF671F 100%)",
            }}
        >
            <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-10 text-white md:grid-cols-2 md:py-16">
                <div>
                    <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-bold backdrop-blur">
                        ⚡ RUN ON DOLICIOUS&apos;
                    </span>

                    <h1 className="mt-3 text-4xl leading-tight md:text-6xl font-bold">
                        Fresh coffee.
                        <br />
                        Hot donuts.
                        <br />
                        Happy mornings.
                    </h1>

                    <p className="mt-4 max-w-md opacity-95">
                        Order ahead, skip the line, and get your favorites in
                        minutes.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button
                            asChild
                            className="bg-white text-primary hover:bg-white/90"
                        >
                            <Link href="#menu">Order Now →</Link>
                        </Button>
                    </div>
                </div>

                <div className="text-center text-[10rem] leading-none md:text-[14rem]">
                    🍩
                </div>
            </div>
        </section>
    );
}
