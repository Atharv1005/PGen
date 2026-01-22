"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useWallet } from "@/hooks/useWallet";

export default function LoginPage() {
  const router = useRouter();
  const { address, isConnected, connectWallet, isConnecting } = useWallet();

  // Redirect to dashboard if already connected
  useEffect(() => {
    if (isConnected && address) {
      router.push("/dashboard");
    }
  }, [isConnected, address, router]);

  const handleConnect = async () => {
    try {
      connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">PGen Login</h1>
        <p className="text-sm text-slate-300 mb-6">
          Sign in with your wallet to continue.
        </p>
        
        {isConnected && address ? (
          <div className="space-y-4">
            <div className="p-3 bg-slate-800 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">Connected</div>
              <div className="text-sm font-mono truncate">{address}</div>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 py-3 text-sm font-medium transition"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 py-3 text-sm font-medium transition"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        )}

        <p className="text-xs text-slate-500 mt-4 text-center">
          Make sure you have MetaMask installed
        </p>
      </div>
    </main>
  );
}