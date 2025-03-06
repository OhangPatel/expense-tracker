// src/components/Home.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Add framer-motion to your dependencies if not already installed

const Home = () => {
  const features = [
    {
      title: "Split Expenses Effortlessly",
      description:
        "Easily divide costs between friends, whether it's equal splits, percentages, or custom amounts. No more math headaches or awkward money talks!",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-blue-600"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      color: "blue",
      image: "/file.svg",
    },
    {
      title: "Create Fun Group Collections",
      description:
        "Make separate groups for roommates, trips, events or projects. Add friends with a click and keep everyone's expenses neatly organized.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-emerald-600"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      color: "emerald",
      image: "/globe.svg",
    },
    {
      title: "See Who Owes What Instantly",
      description:
        "Always know exactly where you stand with auto-updating balances. See who paid, who owes, and settle up without the mental math or messy spreadsheets.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-purple-600"
        >
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
      ),
      color: "purple",
      image: "/window.svg",
    },
    {
      title: "Pay & Get Paid Easily",
      description:
        "Connect to popular payment apps and settle debts with one tap. Venmo, PayPal, Zelle and more - get money back without the awkward reminders.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-amber-600"
        >
          <rect width="20" height="14" x="2" y="5" rx="2"></rect>
          <line x1="2" x2="22" y1="10" y2="10"></line>
        </svg>
      ),
      color: "amber",
      image: "/globe.svg",
    },
  ];

  // Function to get color class based on feature color
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        icon: "text-blue-600",
        border: "border-blue-200",
        light: "bg-blue-100",
        gradient: "from-blue-500 to-blue-600",
        highlightFrom: "from-blue-400/20",
        highlightTo: "to-blue-600/5",
      },
      emerald: {
        bg: "bg-emerald-50",
        icon: "text-emerald-600",
        border: "border-emerald-200",
        light: "bg-emerald-100",
        gradient: "from-emerald-500 to-emerald-600",
        highlightFrom: "from-emerald-400/20",
        highlightTo: "to-emerald-600/5",
      },
      purple: {
        bg: "bg-purple-50",
        icon: "text-purple-600",
        border: "border-purple-200",
        light: "bg-purple-100",
        gradient: "from-purple-500 to-purple-600",
        highlightFrom: "from-purple-400/20",
        highlightTo: "to-purple-600/5",
      },
      amber: {
        bg: "bg-amber-50",
        icon: "text-amber-600",
        border: "border-amber-200",
        light: "bg-amber-100",
        gradient: "from-amber-500 to-amber-600",
        highlightFrom: "from-amber-400/20",
        highlightTo: "to-amber-600/5",
      },
    };

    return colorMap[color] || colorMap.blue;
  };

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Feature Showcase - Modern Professional Design */}
      <section className="relative w-full py-24 px-4 overflow-hidden">
        {/* Abstract shapes for background - modern design element */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -right-80 top-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100/40 to-transparent"></div>
          <div className="absolute -left-40 top-20 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-100/30 to-transparent"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] blur-3xl bg-emerald-100/20 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header with casual, friendly display */}
<div className="relative text-center mb-20">
  {/* Friendly badge */}
  <div
    className="inline-flex items-center mb-6 px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 
border border-gray-200 rounded-full shadow-sm"
  >
    <span className="text-gray-500 text-sm font-medium">
      #NoMoreAwkwardConversations
    </span>
    <div className="ml-2 bg-blue-600 h-1.5 w-1.5 rounded-full"></div>
  </div>

  {/* Heading with friendly elements on sides */}
  <div className="relative">
    {/* Left side emoji/graphics */}
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center space-y-6 -ml-24"
    >
      <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-3xl">💸</span>
      </div>
      <div className="bg-purple-50 w-14 h-14 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-2xl">🧾</span>
      </div>
      <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-xl">💰</span>
      </div>
    </motion.div>

    {/* Right side emoji/graphics */}
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center space-y-6 -mr-24"
    >
      <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-3xl">🎉</span>
      </div>
      <div className="bg-amber-50 w-14 h-14 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-2xl">🤝</span>
      </div>
      <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-xl">✨</span>
      </div>
    </motion.div>

    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight max-w-3xl mx-auto">
      Split Bills With Friends,
      <br />
      <span className="relative">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Keep The Good Vibes
        </span>
        <svg
          className="absolute bottom-0 left-0 w-full h-2 -mb-1 text-blue-200/50"
          viewBox="0 0 300 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 5C50 -1 100 9 150 5C200 1 250 9 300 5"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </h2>
  </div>

  <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
    Say goodbye to awkward money talks! Our app makes sharing expenses
    with roommates, friends and family super simple.
  </p>
</div>

          {/* Feature Card Grid - modern professional layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {features.map((feature, index) => {
              const colorClasses = getColorClasses(feature.color);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
                >
                  {/* Feature highlight gradient */}
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br ${colorClasses.highlightFrom} ${colorClasses.highlightTo} transition-opacity duration-500 -z-10`}
                  ></div>

                  <div className="flex flex-col h-full p-8">
                    <div className="flex items-center mb-6">
                      {/* Modern icon container */}
                      <div
                        className={`flex items-center justify-center w-14 h-14 ${colorClasses.bg} rounded-xl mr-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                      >
                        {feature.icon}
                      </div>

                      {/* Title with line design element */}
                      <h3 className="text-xl font-bold text-gray-900 relative">
                        {feature.title}
                        <div
                          className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r ${colorClasses.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`}
                        ></div>
                      </h3>
                    </div>

                    {/* Modernized description */}
                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                      {feature.description}
                    </p>

                    {/* Enhanced call to action */}
                    <div className="mt-auto flex items-center justify-between">
                      <Link
                        href="/features"
                        className={`inline-flex items-center font-medium text-${feature.color}-600 group-hover:underline transition-all`}
                      >
                        <span>Explore Capability</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>

                      {/* Professional badge indicator */}
                      <div className="flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full ${colorClasses.light} mr-2`}
                        ></div>
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                          Pro Feature
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Enhanced call to action section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mt-14"
          >
            <Link
              href="/signup"
              className="relative overflow-hidden inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 group-hover:ml-3 transition-all duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>

            {/* Trust indicators - important for professional sites */}
            <div className="mt-8">
              <p className="text-gray-500 text-sm mb-3">
                Loved by thousands of friend groups & roommates
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
                {/* More relatable community references */}
                <div className="text-gray-400 font-medium">NYC Roomies</div>
                <div className="text-gray-400 font-medium">Travel Buddies</div>
                <div className="text-gray-400 font-medium">College Squad</div>
                <div className="text-gray-400 font-medium">Family Sharers</div>
                <div className="text-gray-400 font-medium">
                  Weekend Warriors
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Rest of your existing code remains unchanged */}
      {/* Rest of your existing code remains unchanged */}
      {/* Hero Section - Second section */}
      <section className="relative w-full py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left content - Text */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                Split Expenses,{" "}
                <span className="text-blue-600">Maintain Friendships</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                The simplest way to share expenses with friends and family.
                Track group bills, split costs fairly, and get paid back without
                the awkward conversations.
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
                    <h3 className="font-medium text-gray-800">Create Groups</h3>
                    <p className="text-gray-600 text-sm">
                      Organize expenses by trip, household, or event with custom
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
                    <h3 className="font-medium text-gray-800">Split Fairly</h3>
                    <p className="text-gray-600 text-sm">
                      Divide expenses equally or with custom amounts for each
                      person
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
                      See who owes what at a glance with real-time balance
                      updates
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
                      <div className="font-medium text-gray-800">$86.20</div>
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
                      <div className="font-medium text-gray-800">$48.50</div>
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
                      <div className="font-medium text-gray-800">$175.00</div>
                      <div className="text-xs text-red-600">You owe $43.75</div>
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
                      <span className="text-gray-600">You are owed:</span>
                      <span className="font-medium text-green-600">$57.93</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">You owe:</span>
                      <span className="font-medium text-red-600">$43.75</span>
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
              Our platform is designed with your financial peace of mind as the
              top priority. Here&apos;s why thousands trust us to manage their
              shared expenses.
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
                  Your financial data is encrypted and never shared. We use
                  bank-level security protocols to ensure your information
                  remains private.
                </p>
                <div className="flex items-center text-sm text-blue-600">
                  <span className="font-medium">Learn about our security</span>
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
                  Track spending patterns, identify areas for savings, and
                  monitor your financial health with beautiful, intuitive
                  visualizations.
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
                  Connect with popular payment apps and banking services.
                  Transfer money, settle debts, and reconcile accounts in just a
                  few clicks.
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
                  Traveling internationally? No problem. Track expenses in
                  multiple currencies with automatic conversion at current
                  exchange rates.
                </p>
                <div className="flex items-center text-sm text-red-600">
                  <span className="font-medium">View supported currencies</span>
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
                  Never chase payments again. Set up automatic reminders for
                  pending settlements and recurring expenses for everyone in
                  your group.
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
                  Automatically categorize your expenses with AI-powered
                  detection. Create custom categories for better financial
                  management.
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
              No credit card required. Free forever for basic usage.
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
              Don&apos;t take our word for it. Here&apos;s what our users have
              to say about their experience.
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
                  <h4 className="font-semibold text-gray-800">James Donovan</h4>
                  <p className="text-gray-500 text-sm">
                    Travel Group Organizer
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;This app has been a lifesaver for our annual ski trip
                with friends. No more spreadsheets or awkward money
                conversations. Everyone knows exactly what they owe!&rdquo;
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
                  <h4 className="font-semibold text-gray-800">Emily Lin</h4>
                  <p className="text-gray-500 text-sm">
                    Roommate & Household Manager
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;Our apartment of 4 uses this for everything - rent,
                utilities, groceries, even takeout! The automatic splitting and
                reminders have eliminated all the friction around money.&rdquo;
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
                  <h4 className="font-semibold text-gray-800">Michael Scott</h4>
                  <p className="text-gray-500 text-sm">Office Manager</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;Managing office expenses has never been easier. The
                detailed analytics and seamless integrations with our accounting
                software have saved us countless hours.&rdquo;
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
                Split expenses with friends and family, track group spending,
                and settle debts without the awkward conversations. The smart
                way to manage shared finances.
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
                  Get the latest news, updates and tips delivered directly to
                  your inbox.
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
