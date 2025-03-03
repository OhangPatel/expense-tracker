// src/components/Home.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left content - Text */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                Split Expenses, <span className="text-blue-600">Maintain Friendships</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                The simplest way to share expenses with friends and family. Track group bills, split costs fairly, and get paid back without the awkward conversations.
              </p>
              
              <div className="flex flex-wrap gap-5 mb-10">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Create Groups</h3>
                    <p className="text-gray-600 text-sm">Organize expenses by trip, household, or event with custom groups</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Split Fairly</h3>
                    <p className="text-gray-600 text-sm">Divide expenses equally or with custom amounts for each person</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-purple-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Track Balances</h3>
                    <p className="text-gray-600 text-sm">See who owes what at a glance with real-time balance updates</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md">
                  Create Free Account
                </Link>
                <Link href="/features" className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium py-3 px-6 rounded-lg transition-colors">
                  View Features
                </Link>
              </div>
              
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-yellow-400'][i]}`}></div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-gray-600">Joined by 10,000+ users</p>
              </div>
            </div>
            
            {/* Right content - App Showcase */}
            <div className="w-full lg:w-1/2">
              <div className="relative bg-white p-6 rounded-xl shadow-lg">
                {/* Tab header - Group expense */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Weekend Trip Group</h3>
                      <p className="text-sm text-gray-500">4 members • Created April 2023</p>
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
                        <div className="font-medium text-gray-700">Grocery Shopping</div>
                        <div className="text-xs text-gray-500">Paid by Alex • April 15</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-800">$86.20</div>
                      <div className="text-xs text-green-600">You're owed $21.55</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-green-500 rounded-sm"></div>
                      <div>
                        <div className="font-medium text-gray-700">Movie Tickets</div>
                        <div className="text-xs text-gray-500">Paid by You • April 14</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-800">$48.50</div>
                      <div className="text-xs text-green-600">You're owed $36.38</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-purple-500 rounded-sm"></div>
                      <div>
                        <div className="font-medium text-gray-700">Cabin Rental</div>
                        <div className="text-xs text-gray-500">Paid by Sam • April 12</div>
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
                  <h4 className="font-medium text-gray-700 mb-3">Group Balance Summary</h4>
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
                      <span className="font-medium text-gray-700">Net balance:</span>
                      <span className="font-medium text-green-600">+$14.18</span>
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
    </main>
  );
};

export default Home;