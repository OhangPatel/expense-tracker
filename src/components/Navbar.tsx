// FIXME: temp navbar, need to be replaced

"use client";
import Link from "next/link";
import React from "react";
export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-6 px-10 border-b shadow-sm bg-gradient-to-r from-slate-50 to-blue-50">
            <Link href="/" className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v4H4V6zm0 6h12v2H4v-2z" clipRule="evenodd" />
                </svg>
                <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                    Expense Manager
                </span>
            </Link>
            <div className="space-x-6">
                <Link
                    href="/login"
                    className="px-8 py-4 text-lg rounded-lg border-2 border-blue-400 text-blue-500 
                    hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 
                    font-medium tracking-wide shadow-sm hover:shadow-md"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg 
                    hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 
                    font-medium tracking-wide shadow-md hover:shadow-lg"
                >
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}