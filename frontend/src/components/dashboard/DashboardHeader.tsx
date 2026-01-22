"use client";

import { useRouter } from "next/navigation";
import { useWallet } from "@/hooks/useWallet";

export function DashboardHeader() {
  const router = useRouter();
  const { address, disconnect, isConnected } = useWallet();

  const handleLogout = () => {
    disconnect();
    router.push("/login");
  };

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">PGen</h1>
        {isConnected && address && (
          <div className="text-xs text-slate-400 font-mono">
            {formatAddress(address)}
          </div>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
      >
        Logout
      </button>
    </header>
  );
}
