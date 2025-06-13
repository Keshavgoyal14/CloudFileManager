import { ReactNode } from "react";
import { cookies } from "next/headers"
import SessionProvider from "../app/SessionProvider";
import "./globals.css";
import AuthGuard from "./AuthGuard";  
import ParentFolderProvider from "./ParentFolderProvider";
import { Toaster } from "@/components/ui/sonner"
import Storage from "../component/Storage/Storage"
import { SidebarProvider } from "@/components/ui/sidebar"
import SideNavbar  from "../component/SideNavbar"
import ScreenGuard from "./ScreenGuard";
export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  
  return (
    <html lang="en">
      <body >
        <SessionProvider> 
        <ParentFolderProvider>
         
      <SidebarProvider defaultOpen={defaultOpen}>
        <ScreenGuard>
         <AuthGuard>
      <main className="h-[738px] m-auto" > 
        <div className="flex h-full">
       <SideNavbar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
          <div className="col-span-2">
        {children}
        <Toaster /></div>
        <div className="col-span-1 bg-gray-50 shadow-xl m-2 order-first md:order-last">
   
      <Storage/>  </div></div>
   </div> </main></AuthGuard></ScreenGuard>
  </SidebarProvider></ParentFolderProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
