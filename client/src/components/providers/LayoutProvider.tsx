import React from "react";

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

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
