"use client";

import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function Dashboard() {

  const router = useRouter();

  useEffect(() => {

    if (!isAuthenticated()) {

      router.push("/login");

    }

  }, []);

  return (

    <main className="min-h-screen bg-[#0B0B0F] text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-3xl font-bold">
          Welcome to Dashboard
        </h1>

      </div>

    </main>

  );

}