"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = () => {
    const metaMaskConnector = connectors.find(
      (c) => c.id === "injected" || c.name === "MetaMask"
    );
    if (metaMaskConnector) {
      connect({ connector: metaMaskConnector });
    }
  };

  return {
    address,
    isConnected,
    connectWallet,
    disconnect,
    isConnecting: isPending,
  };
}