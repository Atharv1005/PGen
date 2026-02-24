"use client";

import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white">

      <Navbar />

      <div className="flex h-[85vh]">

        {/* Sidebar */}
        <div className="w-[300px] bg-[#14141A] p-4">

          <h2 className="font-bold mb-4">Chats</h2>

          <div className="blur-sm pointer-events-none">

            <div className="p-3 bg-[#1f1f28] rounded-lg mb-2">
              Rahul
            </div>

            <div className="p-3 bg-[#1f1f28] rounded-lg mb-2">
              Acme Corp
            </div>

          </div>

        </div>

        {/* Chat Area */}
        <div className="flex-1 flex items-center justify-center">

          <div className="text-center">

            <div className="blur-sm mb-4">
              <p>Hello</p>
              <p>Payment received</p>
            </div>

            <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg">
              Login to start chatting
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}