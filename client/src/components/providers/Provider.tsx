"use client";

import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import LayoutProvider from "./LayoutProvider";
import StoreProvider from "./StoreProvider";
import ThemeProvider from "./ThemeProvider";

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 1,
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                <StoreProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                </StoreProvider>
            </ThemeProvider>
            <Toaster position="bottom-right" richColors />
        </QueryClientProvider>
    );
};

export default Provider;
