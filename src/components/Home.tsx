// src/components/Home.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
    // State for the feature slideshow
    const [currentSlide, setCurrentSlide] = useState(0);

    // Features data for the slideshow
    const features = [
        {
            title: "Split Expenses Fairly",
            description:
                "Divide costs among friends automatically with equal, percentage, or custom splits.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path>
                </svg>
            ),
            color: "from-blue-500 to-cyan-400",
            image: "/file.svg",
        },
        {
            title: "Track Group Expenses",
            description:
                "Create groups for trips, households, or events to keep expenses organized.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
            color: "from-green-500 to-emerald-400",
            image: "/globe.svg",
        },
        {
            title: "Real-Time Balance Updates",
            description:
                "Know who owes what with instant calculations and balance tracking.",
            icon: (
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-purple-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm animate-pulse">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            ),
            color: "from-purple-500 to-indigo-400",
            image: "/window.svg",
        },
    ];

    // Auto-advance slides
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % features.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearTimeout(timer);
    }, [currentSlide, features.length]);

    return (
        <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
            {/* Interactive Feature Slideshow - First section */}
            <section className="relative w-full py-12 px-4 bg-gray-50 overflow-hidden">
                {/* Enhanced header with decorative elements */}
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 relative">
                        {/* Decorative elements */}
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 hidden md:block">
                            <div className="w-20 h-20 rounded-full bg-blue-100 opacity-50"></div>
                            <div className="w-12 h-12 rounded-full bg-green-100 opacity-50 -mt-6 ml-12"></div>
                        </div>
                        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 hidden md:block">
                            <div className="w-20 h-20 rounded-full bg-purple-100 opacity-50"></div>
                            <div className="w-12 h-12 rounded-full bg-yellow-100 opacity-50 -mt-6 mr-12"></div>
                        </div>

                        {/* Main heading with animation */}
                        <div className="relative inline-block">
                            <span className="absolute -top-6 -right-6 w-12 h-12 bg-blue-50 rounded-full animate-ping opacity-70"></span>
                            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                                Discover What You Can Do
                            </h2>
                        </div>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto relative z-10">
                            Simplify expense sharing with powerful features
                            designed for everyday use
                        </p>
                        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-5 rounded-full"></div>
                    </div>

                    <div className="relative h-96 md:h-[28rem]">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-1000 transform 
                  ${
                      index === currentSlide
                          ? "opacity-100 translate-x-0 z-10"
                          : index < currentSlide
                          ? "opacity-0 -translate-x-full z-0"
                          : "opacity-0 translate-x-full z-0"
                  }`}
                            >
                                <div className="flex flex-col md:flex-row h-full items-center gap-8">
                                    {/* Left side - Feature description */}
                                    <div className="w-full md:w-1/2 text-center md:text-left">
                                        <div
                                            className={`inline-flex p-3 rounded-full bg-gradient-to-r ${feature.color} bg-opacity-10 mb-6 group transform transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                                        >
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-800 mb-4">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xl text-gray-600 mb-6">
                                            {feature.description}
                                        </p>
                                        <div
                                            className={`h-2 w-24 rounded-full bg-gradient-to-r ${feature.color} mx-auto md:mx-0`}
                                        ></div>
                                    </div>

                                    {/* Right side - Feature visual */}
                                    <div className="w-full md:w-1/2 flex justify-center items-center">
                                        <div
                                            className={`relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-r ${feature.color} rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105`}
                                        >
                                            <div className="absolute inset-1 bg-white rounded-xl flex items-center justify-center">
                                                <Image
                                                    src={feature.image}
                                                    alt={feature.title}
                                                    width={280}
                                                    height={280}
                                                    className="object-contain p-4"
                                                />
                                            </div>
                                            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white bg-opacity-20 backdrop-blur-sm"></div>
                                            <div className="absolute -left-6 -top-6 w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Enhanced slide indicators */}
                    <div className="flex justify-center space-x-2 mt-8">
                        {features.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`relative transition-all duration-300 ${
                                    currentSlide === index
                                        ? "w-10 h-4 bg-gradient-to-r from-blue-500 to-purple-500"
                                        : "w-4 h-4 bg-gray-300 hover:bg-gray-400"
                                } rounded-full overflow-hidden`}
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                {currentSlide === index && (
                                    <span className="absolute inset-0 bg-white opacity-30 animate-pulse"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rest of your existing code remains unchanged */}
            {/* Hero Section - Second section */}
            <section className="relative w-full py-20 px-4 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left content - Text */}
                        <div className="w-full lg:w-1/2">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                                Split Expenses,{" "}
                                <span className="text-blue-600">
                                    Maintain Friendships
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-8">
                                The simplest way to share expenses with friends
                                and family. Track group bills, split costs
                                fairly, and get paid back without the awkward
                                conversations.
                            </p>

                            <div className="flex flex-wrap gap-5 mb-10">
                                <div className="flex items-start">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-5 h-5 text-green-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">
                                            Create Groups
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Organize expenses by trip,
                                            household, or event with custom
                                            groups
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-5 h-5 text-blue-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">
                                            Split Fairly
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Divide expenses equally or with
                                            custom amounts for each person
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-5 h-5 text-purple-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">
                                            Track Balances
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            See who owes what at a glance with
                                            real-time balance updates
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/signup"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md"
                                >
                                    Create Free Account
                                </Link>
                                <Link
                                    href="/features"
                                    className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium py-3 px-6 rounded-lg transition-colors"
                                >
                                    View Features
                                </Link>
                            </div>

                            <div className="mt-8 flex items-center">
                                <div className="flex -space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-8 h-8 rounded-full border-2 border-white ${
                                                [
                                                    "bg-blue-400",
                                                    "bg-green-400",
                                                    "bg-purple-400",
                                                    "bg-yellow-400",
                                                ][i]
                                            }`}
                                        ></div>
                                    ))}
                                </div>
                                <p className="ml-4 text-sm text-gray-600">
                                    Joined by 10,000+ users
                                </p>
                            </div>
                        </div>

                        {/* Right content - App Showcase */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative bg-white p-6 rounded-xl shadow-lg">
                                {/* Tab header - Group expense */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 text-blue-600"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                Weekend Trip Group
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                4 members • Created April 2023
                                            </p>
                                        </div>
                                    </div>
                                    <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                                        Add Expense
                                    </button>
                                </div>

                                {/* Recent expenses list */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-8 bg-blue-500 rounded-sm"></div>
                                            <div>
                                                <div className="font-medium text-gray-700">
                                                    Grocery Shopping
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Paid by Alex • April 15
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-gray-800">
                                                $86.20
                                            </div>
                                            <div className="text-xs text-green-600">
                                                You&apos;re owed $21.55
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-8 bg-green-500 rounded-sm"></div>
                                            <div>
                                                <div className="font-medium text-gray-700">
                                                    Movie Tickets
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Paid by You • April 14
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-gray-800">
                                                $48.50
                                            </div>
                                            <div className="text-xs text-green-600">
                                                You&apos;re owed $36.38
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-8 bg-purple-500 rounded-sm"></div>
                                            <div>
                                                <div className="font-medium text-gray-700">
                                                    Cabin Rental
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Paid by Sam • April 12
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-gray-800">
                                                $175.00
                                            </div>
                                            <div className="text-xs text-red-600">
                                                You owe $43.75
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary section */}
                                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-700 mb-3">
                                        Group Balance Summary
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                You are owed:
                                            </span>
                                            <span className="font-medium text-green-600">
                                                $57.93
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                You owe:
                                            </span>
                                            <span className="font-medium text-red-600">
                                                $43.75
                                            </span>
                                        </div>
                                        <div className="h-px bg-gray-200 my-2"></div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-700">
                                                Net balance:
                                            </span>
                                            <span className="font-medium text-green-600">
                                                +$14.18
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -z-10 w-64 h-64 rounded-full bg-blue-100 opacity-70 -bottom-10 -right-10"></div>
                            <div className="absolute -z-10 w-40 h-40 rounded-full bg-green-100 opacity-70 -top-5 -left-5"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section - Third section */}
            <section className="relative w-full py-24 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Why Choose Our Expense Tracker?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our platform is designed with your financial peace
                            of mind as the top priority. Here&apos;s why
                            thousands trust us to manage their shared expenses.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature Card 1 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-3 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-7 h-7 text-blue-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    Secure & Private
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Your financial data is encrypted and never
                                    shared. We use bank-level security protocols
                                    to ensure your information remains private.
                                </p>
                                <div className="flex items-center text-sm text-blue-600">
                                    <span className="font-medium">
                                        Learn about our security
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4 ml-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Feature Card 2 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-400"></div>
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-7 h-7 text-green-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    Detailed Analytics
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Track spending patterns, identify areas for
                                    savings, and monitor your financial health
                                    with beautiful, intuitive visualizations.
                                </p>
                                <div className="flex items-center text-sm text-green-600">
                                    <span className="font-medium">
                                        Explore analytics features
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4 ml-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Feature Card 3 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-3 bg-gradient-to-r from-purple-500 to-indigo-400"></div>
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-7 h-7 text-purple-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    Seamless Integrations
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Connect with popular payment apps and
                                    banking services. Transfer money, settle
                                    debts, and reconcile accounts in just a few
                                    clicks.
                                </p>
                                <div className="flex items-center text-sm text-purple-600">
                                    <span className="font-medium">
                                        See supported integrations
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4 ml-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Feature Card 4 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-3 bg-gradient-to-r from-red-500 to-pink-400"></div>
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-7 h-7 text-red-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    Currency Support
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Traveling internationally? No problem. Track
                                    expenses in multiple currencies with
                                    automatic conversion at current exchange
                                    rates.
                                </p>
                                <div className="flex items-center text-sm text-red-600">
                                    <span className="font-medium">
                                        View supported currencies
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4 ml-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Feature Card 5 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-3 bg-gradient-to-r from-yellow-500 to-amber-400"></div>
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mb-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-7 h-7 text-yellow-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    Smart Reminders
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Never chase payments again. Set up automatic
                                    reminders for pending settlements and
                                    recurring expenses for everyone in your
                                    group.
                                </p>
                                <div className="flex items-center text-sm text-yellow-600">
                                    <span className="font-medium">
                                        Learn about notification settings
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4 ml-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Feature Card 6 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-3 bg-gradient-to-r from-teal-500 to-cyan-400"></div>
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mb-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-7 h-7 text-teal-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    Smart Expense Categories
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Automatically categorize your expenses with
                                    AI-powered detection. Create custom
                                    categories for better financial management.
                                </p>
                                <div className="flex items-center text-sm text-teal-600">
                                    <span className="font-medium">
                                        Explore categorization features
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4 ml-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md"
                        >
                            <span>Get Started For Free</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 ml-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </Link>
                        <p className="text-gray-500 mt-4">
                            No credit card required. Free forever for basic
                            usage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Fourth section (Bonus) */}
            <section className="relative w-full py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Trusted by Users Worldwide
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Don&apos;t take our word for it. Here&apos;s what
                            our users have to say about their experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                                    JD
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">
                                        James Donovan
                                    </h4>
                                    <p className="text-gray-500 text-sm">
                                        Travel Group Organizer
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">
                                &ldquo;This app has been a lifesaver for our
                                annual ski trip with friends. No more
                                spreadsheets or awkward money conversations.
                                Everyone knows exactly what they owe!&rdquo;
                            </p>
                            <div className="flex text-yellow-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
                                    EL
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">
                                        Emily Lin
                                    </h4>
                                    <p className="text-gray-500 text-sm">
                                        Roommate & Household Manager
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">
                                &ldquo;Our apartment of 4 uses this for
                                everything - rent, utilities, groceries, even
                                takeout! The automatic splitting and reminders
                                have eliminated all the friction around
                                money.&rdquo;
                            </p>
                            <div className="flex text-yellow-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">
                                    MS
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">
                                        Michael Scott
                                    </h4>
                                    <p className="text-gray-500 text-sm">
                                        Office Manager
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">
                                &ldquo;Managing office expenses has never been
                                easier. The detailed analytics and seamless
                                integrations with our accounting software have
                                saved us countless hours.&rdquo;
                            </p>
                            <div className="flex text-yellow-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white pt-16 pb-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
                        {/* Brand and Description */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                                    Expense Manager
                                </span>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Split expenses with friends and family, track
                                group spending, and settle debts without the
                                awkward conversations. The smart way to manage
                                shared finances.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <span className="sr-only">Instagram</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <span className="sr-only">Twitter</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <span className="sr-only">GitHub</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                                Product
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Integrations
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                                Company
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Press
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                                Resources
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Webinars
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Developers
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="border-t border-gray-700 pt-8 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div className="md:col-span-2">
                                <h3 className="text-lg font-medium text-white mb-2">
                                    Subscribe to our newsletter
                                </h3>
                                <p className="text-gray-400">
                                    Get the latest news, updates and tips
                                    delivered directly to your inbox.
                                </p>
                            </div>
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="bg-gray-700 text-white px-4 py-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © 2025 Expense Manager. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Cookie Policy
                            </a>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute right-0 top-0 -mt-20 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
                    <div className="absolute left-0 bottom-0 w-60 h-60 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
                </div>
            </footer>
        </main>
    );
};

export default Home;

// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Head from "next/head";

// export const Home = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//     const heroRef = useRef(null);

//     // Features data for the slideshow
//     const features = [
//         {
//             title: "Split Expenses Fairly",
//             description:
//                 "Divide costs among friends automatically with equal, percentage, or custom splits.",
//             icon: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2",
//             color: "from-[#00E5FF] to-[#2979FF]",
//             gradient: "linear-gradient(135deg, #00E5FF 0%, #2979FF 100%)",
//         },
//         {
//             title: "Track Group Expenses",
//             description:
//                 "Create groups for trips, households, or events to keep expenses organized.",
//             icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
//             color: "from-[#FF3D9A] to-[#FE7F2D]",
//             gradient: "linear-gradient(135deg, #FF3D9A 0%, #FE7F2D 100%)",
//         },
//         {
//             title: "Real-Time Balance Updates",
//             description:
//                 "Know who owes what with instant calculations and balance tracking.",
//             icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
//             color: "from-[#7000FF] to-[#BC00FF]",
//             gradient: "linear-gradient(135deg, #7000FF 0%, #BC00FF 100%)",
//         },
//     ];

//     // Handle mouse movement for parallax effects
//     useEffect(() => {
//         const handleMouseMove = (e) => {
//             if (heroRef.current) {
//                 const { clientX, clientY } = e;
//                 const { width, height, left, top } =
//                     heroRef.current.getBoundingClientRect();
//                 const x = (clientX - left) / width - 0.5;
//                 const y = (clientY - top) / height - 0.5;
//                 setMousePosition({ x, y });
//             }
//         };

//         window.addEventListener("mousemove", handleMouseMove);
//         return () => {
//             window.removeEventListener("mousemove", handleMouseMove);
//         };
//     }, []);

//     // Auto-advance slides
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % features.length);
//         }, 5000);

//         return () => clearTimeout(timer);
//     }, [currentSlide, features.length]);

//     return (
//         <>
//             <Head>
//                 <title>Split.io | Expense Sharing Made Simple</title>
//                 <meta
//                     name="description"
//                     content="Next-generation expense splitting for modern life"
//                 />
//                 <link rel="icon" href="/favicon.ico" />
//                 <link
//                     href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
//                     rel="stylesheet"
//                 />
//             </Head>

//             <main className="min-h-screen bg-black text-white font-['Space_Grotesk']">
//                 {/* Futuristic Navigation */}
//                 <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/30 border-b border-white/10">
//                     <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//                         <div className="flex items-center space-x-2">
//                             <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#2979FF]"></div>
//                             <div>
//                                 <h1 className="text-xl font-medium tracking-tight">
//                                     Split.io
//                                 </h1>
//                                 <p className="text-[10px] text-white/60 -mt-1 tracking-widest">
//                                     スプリット
//                                 </p>
//                             </div>
//                         </div>

//                         <nav className="hidden md:flex items-center space-x-8">
//                             <Link
//                                 href="/profile"
//                                 className="text-sm uppercase tracking-wider hover:text-[#00E5FF] transition-colors"
//                             >
//                                 Dashboard
//                             </Link>
//                             <Link
//                                 href="/about"
//                                 className="text-sm uppercase tracking-wider hover:text-[#00E5FF] transition-colors"
//                             >
//                                 About
//                             </Link>
//                             <Link
//                                 href="/features"
//                                 className="text-sm uppercase tracking-wider hover:text-[#00E5FF] transition-colors"
//                             >
//                                 Features
//                             </Link>
//                             <Link
//                                 href="/expenses"
//                                 className="text-sm uppercase tracking-wider hover:text-[#00E5FF] transition-colors"
//                             >
//                                 Expenses
//                             </Link>
//                         </nav>

//                         <Link
//                             href="/login"
//                             className="hidden md:flex items-center space-x-2 px-5 py-2 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 transition-all"
//                         >
//                             <span className="text-sm">Login</span>
//                             <svg
//                                 width="16"
//                                 height="16"
//                                 viewBox="0 0 16 16"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     d="M3 8H13M13 8L9 4M13 8L9 12"
//                                     stroke="currentColor"
//                                     strokeWidth="1.5"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                 />
//                             </svg>
//                         </Link>

//                         {/* Mobile menu button */}
//                         <button className="md:hidden text-white">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 className="w-6 h-6"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M4 6h16M4 12h16M4 18h16"
//                                 />
//                             </svg>
//                         </button>
//                     </div>
//                 </header>

//                 {/* Hero Section */}
//                 <section
//                     ref={heroRef}
//                     className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20"
//                 >
//                     {/* Abstract Background Elements */}
//                     <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//                         <div
//                             className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00E5FF] opacity-30 blur-[120px]"
//                             style={{
//                                 transform: `translate(${
//                                     mousePosition.x * -30
//                                 }px, ${mousePosition.y * -30}px)`,
//                             }}
//                         ></div>
//                         <div
//                             className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF3D9A] opacity-20 blur-[100px]"
//                             style={{
//                                 transform: `translate(${
//                                     mousePosition.x * 30
//                                 }px, ${mousePosition.y * 30}px)`,
//                             }}
//                         ></div>
//                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
//                             <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_rgba(255,255,255,0)_70%)]"></div>
//                         </div>

//                         {/* Grid pattern */}
//                         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
//                     </div>

//                     <div className="container mx-auto px-6 z-10 text-center max-w-5xl">
//                         <div className="inline-flex items-center mb-6 px-3 py-1 border border-white/10 rounded-full bg-white/5">
//                             <span className="h-2 w-2 rounded-full bg-[#00E5FF] mr-2"></span>
//                             <span className="text-xs text-white/70 tracking-wider">
//                                 NEXT-GEN EXPENSE MANAGEMENT
//                             </span>
//                         </div>

//                         <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
//                             Split Expenses.
//                             <br />
//                             <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] to-[#2979FF]">
//                                 Preserve Friendships.
//                             </span>
//                         </h1>

//                         <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
//                             A revolutionary expense sharing platform that
//                             simplifies group finances with intelligent
//                             splitting, real-time tracking, and seamless
//                             settlements.
//                         </p>

//                         <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
//                             <Link
//                                 href="/signup"
//                                 className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#2979FF] text-black font-medium hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300"
//                             >
//                                 Start Splitting
//                             </Link>
//                             <Link
//                                 href="/demo"
//                                 className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
//                             >
//                                 Watch Demo
//                             </Link>
//                         </div>

//                         {/* Trust indicators */}
//                         <div className="mt-16">
//                             <p className="text-xs uppercase text-white/50 mb-4 tracking-wider">
//                                 Trusted by forward-thinking teams
//                             </p>
//                             <div className="flex flex-wrap justify-center gap-8 opacity-50">
//                                 {[...Array(5)].map((_, i) => (
//                                     <div
//                                         key={i}
//                                         className="h-8 w-24 bg-white/20 rounded"
//                                     ></div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Decorative elements */}
//                     <div className="absolute bottom-10 left-0 right-0 flex justify-center">
//                         <div className="animate-bounce">
//                             <svg
//                                 width="20"
//                                 height="20"
//                                 viewBox="0 0 20 20"
//                                 fill="none"
//                             >
//                                 <path
//                                     d="M10 2V18M10 18L4 12M10 18L16 12"
//                                     stroke="white"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                 />
//                             </svg>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Features Section with 3D Cards */}
//                 <section className="py-32 relative">
//                     <div className="max-w-6xl mx-auto px-6">
//                         <div className="text-center mb-16">
//                             <h2 className="inline-block relative text-3xl md:text-5xl font-bold mb-6">
//                                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] to-[#2979FF]">
//                                     Core Features
//                                 </span>
//                                 <div className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"></div>
//                             </h2>
//                             <p className="text-white/70 max-w-xl mx-auto">
//                                 Reimagining expense sharing with cutting-edge
//                                 technology and thoughtful design
//                             </p>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                             {features.map((feature, index) => (
//                                 <div
//                                     key={index}
//                                     className="relative group p-1 rounded-2xl transition-all duration-300 hover:-translate-y-2"
//                                     style={{ background: feature.gradient }}
//                                 >
//                                     <div className="bg-black rounded-xl p-6 h-full flex flex-col">
//                                         <div
//                                             className="mb-4 w-12 h-12 rounded-lg flex items-center justify-center"
//                                             style={{
//                                                 background: feature.gradient,
//                                             }}
//                                         >
//                                             <svg
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 className="h-6 w-6 text-black"
//                                                 fill="none"
//                                                 viewBox="0 0 24 24"
//                                                 stroke="currentColor"
//                                             >
//                                                 <path
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth={2}
//                                                     d={feature.icon}
//                                                 />
//                                             </svg>
//                                         </div>

//                                         <h3 className="text-xl font-semibold mb-3">
//                                             {feature.title}
//                                         </h3>
//                                         <p className="text-white/70 mb-6">
//                                             {feature.description}
//                                         </p>

//                                         <div className="mt-auto flex items-center text-sm">
//                                             <span className="mr-2 font-medium">
//                                                 Learn more
//                                             </span>
//                                             <svg
//                                                 width="16"
//                                                 height="16"
//                                                 viewBox="0 0 16 16"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <path
//                                                     d="M3 8H13M13 8L9 4M13 8L9 12"
//                                                     stroke="currentColor"
//                                                     strokeWidth="1.5"
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                 />
//                                             </svg>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* Expense Visualization Section */}
//                 <section className="py-24 relative overflow-hidden">
//                     <div className="absolute top-0 left-0 w-full h-full">
//                         <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7000FF] opacity-20 blur-[100px]"></div>
//                         <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-[#FF3D9A] opacity-20 blur-[80px]"></div>
//                     </div>

//                     <div className="max-w-7xl mx-auto px-6 relative z-10">
//                         <div className="flex flex-col lg:flex-row items-center gap-16">
//                             {/* Left side content */}
//                             <div className="w-full lg:w-1/2">
//                                 <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
//                                     Visualize Your <br />
//                                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7000FF] to-[#BC00FF]">
//                                         Group Expenses
//                                     </span>
//                                 </h2>

//                                 <p className="text-white/70 text-lg mb-8">
//                                     Our intuitive interface gives you complete
//                                     visibility into your shared expenses. See
//                                     who owes what at a glance, track payment
//                                     history, and get detailed insights into
//                                     spending patterns.
//                                 </p>

//                                 <div className="space-y-6 mb-8">
//                                     {[
//                                         "Real-time balance calculations",
//                                         "Custom splitting ratios and categories",
//                                         "Simplified debt settlement pathways",
//                                     ].map((item, i) => (
//                                         <div
//                                             key={i}
//                                             className="flex items-center"
//                                         >
//                                             <div className="h-5 w-5 rounded-full bg-gradient-to-r from-[#7000FF] to-[#BC00FF] mr-4 flex items-center justify-center">
//                                                 <svg
//                                                     width="12"
//                                                     height="12"
//                                                     viewBox="0 0 12 12"
//                                                     fill="none"
//                                                 >
//                                                     <path
//                                                         d="M2.5 6L5 8.5L9.5 4"
//                                                         stroke="white"
//                                                         strokeWidth="1.5"
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                     />
//                                                 </svg>
//                                             </div>
//                                             <span>{item}</span>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <Link
//                                     href="/features"
//                                     className="inline-flex items-center px-6 py-3 rounded-full border border-[#7000FF] hover:bg-[#7000FF]/10 transition-all"
//                                 >
//                                     <span className="mr-2">
//                                         Explore All Features
//                                     </span>
//                                     <svg
//                                         width="16"
//                                         height="16"
//                                         viewBox="0 0 16 16"
//                                         fill="none"
//                                     >
//                                         <path
//                                             d="M3 8H13M13 8L9 4M13 8L9 12"
//                                             stroke="currentColor"
//                                             strokeWidth="1.5"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                         />
//                                     </svg>
//                                 </Link>
//                             </div>

//                             {/* Right side - Interactive expense card */}
//                             <div className="w-full lg:w-1/2 perspective-1000">
//                                 <div className="relative transform rotate-y-[-10deg] rotate-x-10 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-500 shadow-[0_20px_80px_-10px_rgba(112,0,255,0.3)]">
//                                     {/* Expense viewer UI */}
//                                     <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden">
//                                         <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
//                                             <div className="flex items-center space-x-3">
//                                                 <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#7000FF] to-[#BC00FF]"></div>
//                                                 <div>
//                                                     <h3 className="font-medium">
//                                                         Mountain Trip
//                                                     </h3>
//                                                     <p className="text-xs text-white/50">
//                                                         4 members • Active
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <div className="px-3 py-1 rounded-full bg-white/5 text-xs">
//                                                 March 2025
//                                             </div>
//                                         </div>

//                                         <div className="p-6">
//                                             {/* Expense items */}
//                                             {[
//                                                 {
//                                                     name: "Cabin Rental",
//                                                     date: "Mar 12",
//                                                     amount: 350,
//                                                     paid: "Alex",
//                                                     owed: 87.5,
//                                                 },
//                                                 {
//                                                     name: "Groceries",
//                                                     date: "Mar 13",
//                                                     amount: 126.8,
//                                                     paid: "You",
//                                                     owed: -95.1,
//                                                 },
//                                                 {
//                                                     name: "Activities",
//                                                     date: "Mar 14",
//                                                     amount: 210,
//                                                     paid: "Taylor",
//                                                     owed: 52.5,
//                                                 },
//                                             ].map((expense, i) => (
//                                                 <div
//                                                     key={i}
//                                                     className="flex justify-between py-3 border-b border-white/5"
//                                                 >
//                                                     <div className="flex items-start space-x-3">
//                                                         <div className="h-9 w-9 rounded bg-white/5 flex items-center justify-center text-sm">
//                                                             {expense.name.charAt(
//                                                                 0
//                                                             )}
//                                                         </div>
//                                                         <div>
//                                                             <p className="font-medium">
//                                                                 {expense.name}
//                                                             </p>
//                                                             <p className="text-xs text-white/50">
//                                                                 Paid by{" "}
//                                                                 {expense.paid} •{" "}
//                                                                 {expense.date}
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="text-right">
//                                                         <p className="font-medium">
//                                                             ${expense.amount}
//                                                         </p>
//                                                         <p
//                                                             className={`text-xs ${
//                                                                 expense.owed < 0
//                                                                     ? "text-[#00E5FF]"
//                                                                     : "text-[#FF3D9A]"
//                                                             }`}
//                                                         >
//                                                             {expense.owed < 0
//                                                                 ? "You are owed"
//                                                                 : "You owe"}{" "}
//                                                             $
//                                                             {Math.abs(
//                                                                 expense.owed
//                                                             )}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             ))}

//                                             {/* Summary */}
//                                             <div className="mt-6 p-4 rounded-xl bg-white/5">
//                                                 <h4 className="text-sm font-medium mb-3">
//                                                     Balance Summary
//                                                 </h4>
//                                                 <div className="space-y-2">
//                                                     <div className="flex justify-between text-sm">
//                                                         <span className="text-white/70">
//                                                             Total group spend:
//                                                         </span>
//                                                         <span>$686.80</span>
//                                                     </div>
//                                                     <div className="flex justify-between text-sm text-[#00E5FF]">
//                                                         <span>
//                                                             Your net balance:
//                                                         </span>
//                                                         <span>
//                                                             -$45.10 (you're
//                                                             owed)
//                                                         </span>
//                                                     </div>
//                                                 </div>

//                                                 <div className="mt-4">
//                                                     <button className="w-full py-2 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#2979FF] text-black text-sm font-medium">
//                                                         Settle Up
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Decorative elements */}
//                                     <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-r from-[#7000FF] to-[#BC00FF] blur-2xl opacity-40"></div>
//                                     <div className="absolute -top-6 -left-6 h-20 w-20 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#2979FF] blur-2xl opacity-30"></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Testimonials with futuristic cards */}
//                 <section className="py-24 relative">
//                     <div className="max-w-6xl mx-auto px-6">
//                         <div className="text-center mb-16">
//                             <h2 className="inline-block relative text-3xl md:text-5xl font-bold mb-6">
//                                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3D9A] to-[#FE7F2D]">
//                                     User Stories
//                                 </span>
//                                 <div className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF3D9A] to-transparent"></div>
//                             </h2>
//                             <p className="text-white/70 max-w-xl mx-auto">
//                                 See how Split.io transforms the way people
//                                 manage shared expenses
//                             </p>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             {[
//                                 {
//                                     name: "Alex K.",
//                                     role: "Trip Organizer",
//                                     content:
//                                         "Split.io transformed how we handle expenses on group trips. No more spreadsheets or awkward money conversations.",
//                                     avatar: "A",
//                                     rating: 5,
//                                     color: "from-[#00E5FF] to-[#2979FF]",
//                                 },
//                                 {
//                                     name: "Maya J.",
//                                     role: "Household Manager",
//                                     content:
//                                         "Our apartment of 4 uses this for everything - rent, utilities, groceries. The automatic splitting has eliminated all friction around money.",
//                                     avatar: "M",
//                                     rating: 5,
//                                     color: "from-[#7000FF] to-[#BC00FF]",
//                                 },
//                                 {
//                                     name: "Taylor R.",
//                                     role: "Finance Professional",
//                                     content:
//                                         "The analytics and insights are incredible. I can see exactly where our shared money is going and plan accordingly.",
//                                     avatar: "T",
//                                     rating: 5,
//                                     color: "from-[#FF3D9A] to-[#FE7F2D]",
//                                 },
//                             ].map((testimonial, index) => (
//                                 <div
//                                     key={index}
//                                     className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
//                                 >
//                                     <div className="flex items-center mb-4">
//                                         <div
//                                             className={`h-10 w-10 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center font-medium mr-3`}
//                                         >
//                                             {testimonial.avatar}
//                                         </div>
//                                         <div>
//                                             <p className="font-medium">
//                                                 {testimonial.name}
//                                             </p>
//                                             <p className="text-xs text-white/50">
//                                                 {testimonial.role}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <p className="text-white/80 mb-5">
//                                         "{testimonial.content}"
//                                     </p>

//                                     <div className="flex">
//                                         {[...Array(5)].map((_, i) => (
//                                             <svg
//                                                 key={i}
//                                                 className="h-4 w-4 text-[#FFC107]"
//                                                 viewBox="0 0 20 20"
//                                                 fill="currentColor"
//                                             >
//                                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                             </svg>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* CTA Section */}
//                 <section className="py-24 relative overflow-hidden">
//                     <div className="absolute top-0 left-0 w-full h-full">
//                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00E5FF] opacity-10 blur-[120px]"></div>
//                     </div>

//                     <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
//                         <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//                             Start Splitting{" "}
//                             <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] to-[#2979FF]">
//                                 Today
//                             </span>
//                         </h2>

//                         <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
//                             Join thousands of users who are already saving time
//                             and preserving friendships with our next-generation
//                             expense manager.
//                         </p>

//                         <div className="inline-flex flex-col sm:flex-row gap-4">
//                             <Link
//                                 href="/signup"
//                                 className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#2979FF] text-black font-medium hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300 relative overflow-hidden group"
//                             >
//                                 <span className="relative z-10">
//                                     Create Free Account
//                                 </span>
//                                 <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
//                                 <span className="absolute -right-2 -top-2 h-4 w-12 bg-[#00E5FF] blur-md opacity-50 group-hover:opacity-100 transition-opacity"></span>
//                             </Link>
//                             <Link
//                                 href="/pricing"
//                                 className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all group relative overflow-hidden"
//                             >
//                                 <span className="relative z-10">
//                                     View Pricing
//                                 </span>
//                                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.15)_0%,_rgba(0,0,0,0)_70%)]"></div>
//                                 </div>
//                             </Link>
//                         </div>

//                         <p className="mt-6 text-white/50 text-sm">
//                             No credit card required • Cancel anytime • Free for
//                             personal use
//                         </p>

//                         {/* Interactive Elements */}
//                         <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
//                             {[
//                                 {
//                                     count: "10K+",
//                                     label: "Active Users",
//                                     color: "from-[#00E5FF] to-[#2979FF]",
//                                 },
//                                 {
//                                     count: "150K+",
//                                     label: "Expenses Tracked",
//                                     color: "from-[#7000FF] to-[#BC00FF]",
//                                 },
//                                 {
//                                     count: "$2.5M",
//                                     label: "Money Settled",
//                                     color: "from-[#FF3D9A] to-[#FE7F2D]",
//                                 },
//                                 {
//                                     count: "4.9",
//                                     label: "App Store Rating",
//                                     color: "from-[#FFD600] to-[#FF7A00]",
//                                 },
//                             ].map((stat, i) => (
//                                 <div key={i} className="relative group">
//                                     <div
//                                         className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
//                                         style={{
//                                             background: `linear-gradient(135deg, ${stat.color
//                                                 .split(" ")[0]
//                                                 .slice(5, -1)} 0%, ${stat.color
//                                                 .split(" ")[1]
//                                                 .slice(4, -1)} 100%)`,
//                                         }}
//                                     ></div>
//                                     <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-center relative z-10 h-full">
//                                         <div
//                                             className={`text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}
//                                         >
//                                             {stat.count}
//                                         </div>
//                                         <div className="text-xs text-white/60">
//                                             {stat.label}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* Futuristic App Interface Preview */}
//                 <section className="py-24 bg-[#050505] relative">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-30"></div>

//                     <div className="max-w-6xl mx-auto px-6 relative">
//                         <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//                             {/* Left - Mockup */}
//                             <div className="w-full lg:w-3/5 relative">
//                                 <div className="relative z-10 perspective-1000 transform-gpu">
//                                     <div className="w-full rounded-xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,229,255,0.3)] transform lg:rotate-x-2 lg:rotate-y-12 transition-transform duration-500 hover:rotate-x-0 hover:rotate-y-0">
//                                         <div className="bg-[#0A0A0A] border border-white/10 rounded-t-xl p-2">
//                                             <div className="flex items-center mb-2">
//                                                 <div className="flex space-x-1.5 mr-4">
//                                                     <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
//                                                     <div className="w-3 h-3 rounded-full bg-[#FDBC2C]"></div>
//                                                     <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
//                                                 </div>
//                                                 <div className="text-xs text-white/50 flex-1 text-center">
//                                                     Split.io Dashboard
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="relative h-[360px]">
//                                             <div className="absolute inset-0 bg-gradient-to-br from-[#050505] to-[#0A0A0A] border-t border-white/5">
//                                                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

//                                                 {/* App Interface Elements */}
//                                                 <div className="absolute top-4 left-4 right-4 h-16 bg-black/40 border border-white/10 rounded-lg backdrop-blur-lg flex items-center px-4">
//                                                     <div className="flex items-center">
//                                                         <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#2979FF] mr-3 flex items-center justify-center text-black font-medium">
//                                                             S
//                                                         </div>
//                                                         <div>
//                                                             <p className="text-sm font-medium">
//                                                                 Split.io
//                                                             </p>
//                                                             <p className="text-[10px] text-white/50">
//                                                                 Dashboard
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="ml-auto flex space-x-3">
//                                                         <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
//                                                             <svg
//                                                                 width="16"
//                                                                 height="16"
//                                                                 viewBox="0 0 24 24"
//                                                                 fill="none"
//                                                                 xmlns="http://www.w3.org/2000/svg"
//                                                                 className="text-white/70"
//                                                             >
//                                                                 <path
//                                                                     d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v6h-2zm0 8h2v2h-2z"
//                                                                     fill="currentColor"
//                                                                 />
//                                                             </svg>
//                                                         </div>
//                                                         <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
//                                                             <svg
//                                                                 width="16"
//                                                                 height="16"
//                                                                 viewBox="0 0 24 24"
//                                                                 fill="none"
//                                                                 xmlns="http://www.w3.org/2000/svg"
//                                                                 className="text-white/70"
//                                                             >
//                                                                 <path
//                                                                     d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
//                                                                     fill="currentColor"
//                                                                 />
//                                                             </svg>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 {/* Analytics Chart */}
//                                                 <div className="absolute top-24 left-4 right-4 h-32 rounded-lg bg-black/40 border border-white/10 overflow-hidden">
//                                                     <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end">
//                                                         <div className="flex-1 h-[40%] bg-gradient-to-t from-[#00E5FF]/30 to-[#00E5FF]/0"></div>
//                                                         <div className="flex-1 h-[65%] bg-gradient-to-t from-[#00E5FF]/30 to-[#00E5FF]/0"></div>
//                                                         <div className="flex-1 h-[45%] bg-gradient-to-t from-[#00E5FF]/30 to-[#00E5FF]/0"></div>
//                                                         <div className="flex-1 h-[80%] bg-gradient-to-t from-[#00E5FF]/30 to-[#00E5FF]/0"></div>
//                                                         <div className="flex-1 h-[60%] bg-gradient-to-t from-[#00E5FF]/30 to-[#00E5FF]/0"></div>
//                                                         <div className="flex-1 h-[90%] bg-gradient-to-t from-[#00E5FF]/30 to-[#00E5FF]/0"></div>
//                                                         <div className="flex-1 h-[70%] bg-gradient-to-t from-[#00E5FF]/30 to-[#00E5FF]/0"></div>
//                                                     </div>
//                                                     <svg
//                                                         className="absolute bottom-0 left-0 right-0 h-16"
//                                                         preserveAspectRatio="none"
//                                                         width="100%"
//                                                         height="100%"
//                                                         viewBox="0 0 700 200"
//                                                     >
//                                                         <path
//                                                             d="M0,50 C150,150 350,0 500,100 L500,200 L0,200 Z"
//                                                             fill="none"
//                                                             stroke="#00E5FF"
//                                                             strokeWidth="2"
//                                                         ></path>
//                                                     </svg>
//                                                 </div>

//                                                 {/* Expense Cards */}
//                                                 <div className="absolute bottom-4 left-4 right-4 flex space-x-3">
//                                                     <div className="flex-1 h-24 rounded-lg bg-gradient-to-br from-[#7000FF]/20 to-[#BC00FF]/5 border border-[#7000FF]/20 p-3 flex flex-col justify-between">
//                                                         <div className="text-[10px] text-white/50">
//                                                             Monthly Spending
//                                                         </div>
//                                                         <div className="text-white font-medium">
//                                                             $1,248.42
//                                                         </div>
//                                                         <div className="text-[10px] text-[#00E5FF]">
//                                                             +12.5% from last
//                                                             month
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex-1 h-24 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#2979FF]/5 border border-[#00E5FF]/20 p-3 flex flex-col justify-between">
//                                                         <div className="text-[10px] text-white/50">
//                                                             Outstanding
//                                                         </div>
//                                                         <div className="text-white font-medium">
//                                                             $328.50
//                                                         </div>
//                                                         <div className="text-[10px] text-[#FF3D9A]">
//                                                             3 people owe you
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 {/* Glowing Effects */}
//                                                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#7000FF] rounded-full blur-3xl opacity-20"></div>
//                                                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00E5FF] rounded-full blur-3xl opacity-10"></div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Right - Features List */}
//                             <div className="w-full lg:w-2/5">
//                                 <div className="inline-flex items-center mb-6 px-3 py-1 border border-white/10 rounded-full bg-white/5">
//                                     <span className="h-2 w-2 rounded-full bg-[#00E5FF] mr-2 animate-pulse"></span>
//                                     <span className="text-xs text-white/70 tracking-wider">
//                                         NEXT-GEN DASHBOARD
//                                     </span>
//                                 </div>

//                                 <h2 className="text-3xl font-bold mb-6">
//                                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] to-[#2979FF]">
//                                         Intuitive Interface
//                                     </span>{" "}
//                                     for Quick Access
//                                 </h2>

//                                 <p className="text-white/70 mb-8">
//                                     Our dashboard gives you instant access to
//                                     your expenses and settlements with beautiful
//                                     visualizations and real-time updates.
//                                 </p>

//                                 <div className="space-y-4">
//                                     {[
//                                         "Real-time expense tracking and notifications",
//                                         "Beautiful data visualizations for spending insights",
//                                         "Simplified settlement workflow",
//                                         "Cross-platform sync across all your devices",
//                                     ].map((item, i) => (
//                                         <div
//                                             key={i}
//                                             className="flex items-start"
//                                         >
//                                             <div className="h-6 w-6 rounded-full border border-white/10 mr-3 flex items-center justify-center bg-gradient-to-br from-[#00E5FF]/20 to-[#2979FF]/5">
//                                                 <svg
//                                                     width="12"
//                                                     height="12"
//                                                     viewBox="0 0 12 12"
//                                                     fill="none"
//                                                 >
//                                                     <path
//                                                         d="M2.5 6L5 8.5L9.5 4"
//                                                         stroke="#00E5FF"
//                                                         strokeWidth="1.5"
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                     />
//                                                 </svg>
//                                             </div>
//                                             <span className="text-white/80">
//                                                 {item}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="mt-10">
//                                     <Link
//                                         href="/demo"
//                                         className="inline-flex items-center px-6 py-3 bg-[#0A0A0A] border border-white/10 rounded-full hover:bg-white/5 transition-all"
//                                     >
//                                         <span className="mr-2">
//                                             Try Interactive Demo
//                                         </span>
//                                         <svg
//                                             width="16"
//                                             height="16"
//                                             viewBox="0 0 16 16"
//                                             fill="none"
//                                         >
//                                             <path
//                                                 d="M3 8H13M13 8L9 4M13 8L9 12"
//                                                 stroke="currentColor"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                         </svg>
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Footer */}
//                 <footer className="bg-black py-16 relative overflow-hidden">
//                     <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

//                     <div className="max-w-7xl mx-auto px-6 relative z-10">
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
//                             <div className="col-span-2 md:col-span-1">
//                                 <div className="flex items-center space-x-2 mb-6">
//                                     <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#2979FF]"></div>
//                                     <div>
//                                         <h3 className="text-xl font-medium tracking-tight">
//                                             Split.io
//                                         </h3>
//                                         <p className="text-[10px] text-white/60 -mt-1 tracking-widest">
//                                             スプリット
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <p className="text-white/60 text-sm mb-6">
//                                     Next-generation expense sharing platform for
//                                     modern life. Split expenses, track balances,
//                                     and settle up with friends.
//                                 </p>

//                                 <div className="flex space-x-4">
//                                     {[
//                                         "twitter",
//                                         "instagram",
//                                         "github",
//                                         "linkedin",
//                                     ].map((social, i) => (
//                                         <a
//                                             key={i}
//                                             href="#"
//                                             className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
//                                         >
//                                             <span className="text-white/60 hover:text-white transition-colors">
//                                                 {social.charAt(0).toUpperCase()}
//                                             </span>
//                                         </a>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div>
//                                 <h4 className="text-sm uppercase tracking-wider text-white/50 mb-4">
//                                     Company
//                                 </h4>
//                                 <ul className="space-y-3">
//                                     {["About", "Careers", "Blog", "Press"].map(
//                                         (item, i) => (
//                                             <li key={i}>
//                                                 <Link
//                                                     href="#"
//                                                     className="text-white/80 hover:text-[#00E5FF] transition-colors"
//                                                 >
//                                                     {item}
//                                                 </Link>
//                                             </li>
//                                         )
//                                     )}
//                                 </ul>
//                             </div>

//                             <div>
//                                 <h4 className="text-sm uppercase tracking-wider text-white/50 mb-4">
//                                     Product
//                                 </h4>
//                                 <ul className="space-y-3">
//                                     {[
//                                         "Features",
//                                         "Pricing",
//                                         "Security",
//                                         "Integrations",
//                                         "Roadmap",
//                                     ].map((item, i) => (
//                                         <li key={i}>
//                                             <Link
//                                                 href="#"
//                                                 className="text-white/80 hover:text-[#00E5FF] transition-colors"
//                                             >
//                                                 {item}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             <div>
//                                 <h4 className="text-sm uppercase tracking-wider text-white/50 mb-4">
//                                     Resources
//                                 </h4>
//                                 <ul className="space-y-3">
//                                     {[
//                                         "Documentation",
//                                         "Help Center",
//                                         "Community",
//                                         "Status",
//                                         "API",
//                                         "Privacy",
//                                     ].map((item, i) => (
//                                         <li key={i}>
//                                             <Link
//                                                 href="#"
//                                                 className="text-white/80 hover:text-[#00E5FF] transition-colors"
//                                             >
//                                                 {item}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>

//                         <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
//                             <p className="text-white/50 text-sm mb-4 md:mb-0">
//                                 © 2025 Split.io. All rights reserved.
//                             </p>

//                             <div className="flex space-x-6">
//                                 {["Terms", "Privacy", "Cookies", "Sitemap"].map(
//                                     (item, i) => (
//                                         <Link
//                                             key={i}
//                                             href="#"
//                                             className="text-white/50 text-sm hover:text-white transition-colors"
//                                         >
//                                             {item}
//                                         </Link>
//                                     )
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </footer>
//             </main>
//         </>
//     );
// };

// // Add default export for easier importing
// export default Home;
