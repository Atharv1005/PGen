"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { signupUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async () => {

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await signupUser(form);

    if (response.message === "User registered successfully") {

      router.push("/login");

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
            Create Account
          </h2>

          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}

          <input
            name="name"
            placeholder="Full Name"
            className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg"
            onChange={handleChange}
          />

          <input
            name="username"
            placeholder="Username"
            className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg"
            onChange={handleChange}
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 bg-[#1f1f28] rounded-lg"
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
          >
            Sign Up
          </button>

        </div>

      </div>

    </main>

  );

}