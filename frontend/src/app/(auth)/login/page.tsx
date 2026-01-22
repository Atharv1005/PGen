"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    // TODO: integrate wagmi/MetaMask connect + nonce/sign later
    setTimeout(() => {
      router.push("/dashboard");
      setLoading(false);
    }, 400);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">PGen Login</h1>
        <p className="text-sm text-slate-300 mb-6">
          Sign in with your wallet to continue.
        </p>
        <button
          onClick={handleConnect}
          disabled={loading}
          className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 py-3 text-sm font-medium transition"
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      </div>
    </main>
  );
}