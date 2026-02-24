"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white">

      <Navbar />

      <div className="flex items-center justify-center h-[80vh]">

        <div className="bg-[#14141A] p-8 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto">

          <h2 className="text-2xl font-bold mb-6">
            Create Account
          </h2>

            <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg outline-none"
            />

            <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg outline-none"
            />

            <input
                type="text"
                placeholder="Phone Number (optional)"
                className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg outline-none"
            />

            <input
                type="text"
                placeholder="Username"
                className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg outline-none"
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg outline-none"
            />

            <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 mb-6 bg-[#1f1f28] rounded-lg outline-none"
            />

          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 mb-4">
            Sign Up
          </button>

          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400">
              Login
            </Link>
          </p>

        </div>

      </div>

    </main>
  );
}