"use client";
import { usePathname } from "next/navigation";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import Home from "@/components/Home";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    // Only show the ConditionalNavbar when not on auth pages
    // Only show Home on homepage, and don't show children (page.tsx content) 
    return (
        <>
            {!isAuthPage && <ConditionalNavbar />}
            {isHomePage ? <Home /> : children}
        </>
    );
}
