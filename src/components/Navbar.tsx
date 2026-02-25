"use client";

import Link from "next/link";
import { isAuthenticated, logout } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    setLoggedIn(isAuthenticated());

  }, []);

  return (

    <nav className="flex items-center justify-between px-6 py-4 bg-[#14141A]">

      <Link href="/">
        <div className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          PGen
        </div>
      </Link>

      <div className="flex gap-4">

        {loggedIn ? (

          <>
            <Link href="/dashboard">
              <button className="px-4 py-2">
                Dashboard
              </button>
            </Link>

            <button
              onClick={logout}
              className="px-4 py-2 border border-gray-700 rounded-lg"
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <Link href="/login">
              <button className="px-4 py-2">
                Login
              </button>
            </Link>

            <Link href="/signup">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                Sign Up
              </button>
            </Link>
          </>

        )}

      </div>

    </nav>

  );

}