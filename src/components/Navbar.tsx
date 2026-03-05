"use client";

import Link from "next/link";
import { isAuthenticated, logout } from "@/lib/auth";
import { useEffect, useState } from "react";
import { connectWallet } from "@/lib/wallet";
import { connectWalletAPI } from "@/lib/api";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setLoggedIn(isAuthenticated());
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.walletAddress) setWalletConnected(true);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleConnectWallet = async () => {
    const address = await connectWallet();
    if (!address) return;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    await connectWalletAPI(user.id, address);
    setWalletConnected(true);
    alert("Wallet connected: " + address);
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: "68px",
        background: scrolled
          ? "rgba(7,7,13,0.92)"
          : "rgba(7,7,13,0.6)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid",
        borderColor: scrolled
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0.04)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "9px",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 5V11L8 15L1 11V5L8 1Z" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M8 4L12 6.5V9.5L8 12L4 9.5V6.5L8 4Z" fill="white" opacity="0.7" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "20px",
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            PGen
          </span>
        </div>
      </Link>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {loggedIn ? (
          <>
            <Link
              href="/dashboard"
              style={{
                textDecoration: "none",
                color: "rgba(240,240,248,0.7)",
                fontSize: "14px",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: "10px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.color = "#a78bfa";
                (e.target as HTMLElement).style.background = "rgba(124,58,237,0.1)";
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.color = "rgba(240,240,248,0.7)";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              Dashboard
            </Link>

            <button
              onClick={handleConnectWallet}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "8px 18px",
                borderRadius: "10px",
                border: walletConnected
                  ? "1px solid rgba(16,185,129,0.3)"
                  : "1px solid rgba(255,255,255,0.08)",
                background: walletConnected
                  ? "rgba(16,185,129,0.1)"
                  : "rgba(255,255,255,0.04)",
                color: walletConnected ? "#34d399" : "rgba(240,240,248,0.7)",
                fontSize: "13px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.01em",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: walletConnected ? "#10b981" : "rgba(255,255,255,0.25)",
                  boxShadow: walletConnected ? "0 0 8px #10b981" : "none",
                  animation: walletConnected ? "glow-pulse 2s ease-in-out infinite" : "none",
                }}
              />
              {walletConnected ? "Wallet Connected" : "Connect Wallet"}
            </button>

            <button
              onClick={logout}
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(240,240,248,0.55)",
                fontSize: "13px",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              style={{
                textDecoration: "none",
                color: "rgba(240,240,248,0.65)",
                fontSize: "14px",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: "10px",
                transition: "all 0.2s ease",
              }}
            >
              Login
            </Link>

            <Link
              href="/signup"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                padding: "9px 22px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                color: "white",
                fontSize: "14px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "0.01em",
                boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
                transition: "all 0.2s ease",
              }}
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
