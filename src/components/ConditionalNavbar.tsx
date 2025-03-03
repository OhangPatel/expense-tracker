"use client"

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ConditionalNavbar() {
    const pathname = usePathname();
    
    // Hide navbar on login and signup pages, but provide a way to go back to home
    if (pathname === '/login' || pathname === '/signup') {
        return (
            <div className="absolute top-4 left-4">
                <Link 
                    href="/" 
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <span>Back to Home</span>
                </Link>
            </div>
        );
    }
    
    // Show navbar on all other pages
    return <Navbar />;
}