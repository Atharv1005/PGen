"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {

    const response = await loginUser({
      identifier,
      password
    });

    if (response.token) {

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      router.push("/dashboard");

    } else {

      setError(response.message);

    }

  };

  return (

    <main className="min-h-screen bg-[#0B0B0F] text-white">

      <Navbar />

      <div className="flex items-center justify-center h-[80vh]">

        <div className="bg-[#14141A] p-8 rounded-xl w-[400px]">

          <h2 className="text-2xl font-bold mb-6">
            Login
          </h2>

          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}

          <input
            placeholder="Username or Email"
            className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg"
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
          >
            Login
          </button>

        </div>

      </div>

    </main>

  );

}