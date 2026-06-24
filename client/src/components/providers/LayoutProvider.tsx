import React from "react";
import Header from "@/components/layouts/Header";
import Hero from "@/components/panels/HeroPanel";
import MenuFilter from "@/components/panels/MenuFilterPanel";
import Footer from "@/components/layouts/Footer";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        /*<SidebarProvider>
      <Sidebar />
      <Toaster />
      <SidebarInset
        className={"!shadow-none !rounded-none !m-0 !p-4 !min-h-screen"}
      >
        <Header />
        <div className={"flex-1 flex flex-col gap-6 mt-4"}>{children}</div>
      </SidebarInset>
    </SidebarProvider>*/
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default LayoutProvider;
