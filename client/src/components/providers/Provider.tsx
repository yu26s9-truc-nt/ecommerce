import React from "react";

import LayoutProvider from "./LayoutProvider";
import StoreProvider from "./StoreProvider";
import ThemeProvider from "./ThemeProvider";

const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider
            attribute={"class"}
            defaultTheme={"light"}
            enableSystem
            disableTransitionOnChange
        >
            <StoreProvider>
                <LayoutProvider>{children}</LayoutProvider>
            </StoreProvider>
        </ThemeProvider>
    );
};

export default Provider;
