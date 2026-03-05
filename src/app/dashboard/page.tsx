"use client";

import socket from "@/lib/socket";
import Navbar from "@/components/Navbar";
import { sendCrypto } from "@/lib/wallet";
import { useEffect, useState, useRef } from "react";
import { createChat, getMessages, sendMessage } from "@/lib/api";

export default function Dashboard() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [chatId, setChatId] = useState("");
  const [user, setUser] = useState<any>(null);
  const [recipientWallet, setRecipientWallet] = useState<string | null>(null);

  // TEMP second user id (replace later with search)
  const secondUserId = "69a074f301c5e7cb5447415f";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      initializeChat(parsedUser.id);
    }
  }, []);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => { socket.off("receive_message"); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initializeChat = async (userId: string) => {
    const chat = await createChat(userId, secondUserId);
    setChatId(chat._id);
    socket.emit("join_chat", chat._id);
    const otherUser = chat.participants.find((p: any) => p._id !== userId);
    if (otherUser) {
      setRecipientWallet(otherUser.walletAddress);
    } else {
      setRecipientWallet(null);
    }
    const msgs = await getMessages(chat._id);
    setMessages(msgs);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const msg = await sendMessage(chatId, user.id, input);
    socket.emit("send_message", msg);
    setInput("");
  };

  const handlePayment = async () => {
    if (!recipientWallet) {
      alert("Recipient has not connected wallet");
      return;
    }
    const amount = prompt("Enter amount in ETH");
    if (!amount) return;
    const txHash = await sendCrypto(recipientWallet, amount);
    if (txHash) {
      const paymentMessage = { type: "payment", amount, txHash };
      const msg = await sendMessage(chatId, user.id, JSON.stringify(paymentMessage));
      socket.emit("send_message", msg);
    }
  };

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "white",
        fontFamily: "var(--font-body)",
        overflow: "hidden",
      }}
    >
      <Navbar />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── Sidebar ──────────────────────────────────── */}
        <div
          style={{
            width: "280px",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            background: "rgba(10,10,18,0.9)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Sidebar header */}
          <div
            style={{
              padding: "20px 20px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "15px",
                  letterSpacing: "-0.01em",
                }}
              >
                Messages
              </span>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2V12M2 7H12" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Search bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "10px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="rgba(240,240,248,0.3)" strokeWidth="1.4" />
                <path d="M9.5 9.5L12 12" stroke="rgba(240,240,248,0.3)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: "13px", color: "rgba(240,240,248,0.3)" }}>Search messages…</span>
            </div>
          </div>

          {/* Chat list */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
            <div
              style={{
                padding: "11px 14px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.1))",
                border: "1px solid rgba(124,58,237,0.2)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Avatar */}
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    fontWeight: 700,
                    flexShrink: 0,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  T
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "14px",
                      marginBottom: "2px",
                    }}
                  >
                    Test User
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(240,240,248,0.4)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Active now
                  </div>
                </div>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                    flexShrink: 0,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Sidebar footer — user info */}
          {user && (
            <div
              style={{
                padding: "14px 16px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  flexShrink: 0,
                }}
              >
                {user.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user.username || "You"}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(240,240,248,0.35)" }}>Online</div>
              </div>
            </div>
          )}
        </div>

        {/* ── Chat Window ───────────────────────────────── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "var(--bg-base)",
            overflow: "hidden",
          }}
        >
          {/* Chat header */}
          <div
            style={{
              padding: "16px 32px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(10,10,18,0.6)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "var(--font-display)",
              }}
            >
              T
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "15px",
                  letterSpacing: "-0.01em",
                }}
              >
                Test User
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 6px #10b981",
                  }}
                />
                <span style={{ fontSize: "12px", color: "rgba(240,240,248,0.4)" }}>Active now</span>
              </div>
            </div>

            {/* ETH info badge */}
            {recipientWallet && (
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 14px",
                  borderRadius: "100px",
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  fontSize: "12px",
                  color: "#34d399",
                  fontWeight: 600,
                  fontFamily: "var(--font-display)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="#10b981" strokeWidth="1.2" />
                  <path d="M6 3V6.5L8 8" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Wallet connected
              </div>
            )}
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "32px 40px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  color: "rgba(240,240,248,0.25)",
                  paddingTop: "60px",
                }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="8" width="40" height="28" rx="6" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                  <path d="M14 18H34M14 24H26" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M20 36L24 42L28 36" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p style={{ fontSize: "14px" }}>No messages yet. Say hello! 👋</p>
              </div>
            )}

            {messages.map((msg, index) => {
              const isMe = msg.sender === user?.id;
              let content;

              try {
                const parsed = JSON.parse(msg.content);
                if (parsed.type === "payment") {
                  content = (
                    <div
                      style={{
                        padding: "16px 20px",
                        borderRadius: "18px",
                        maxWidth: "320px",
                        background: isMe
                          ? "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.15))"
                          : "rgba(16,185,129,0.1)",
                        border: `1px solid ${isMe ? "rgba(16,185,129,0.35)" : "rgba(16,185,129,0.2)"}`,
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "14px",
                          color: "#34d399",
                          marginBottom: "8px",
                        }}
                      >
                        <span style={{ fontSize: "18px" }}>{isMe ? "💸" : "💰"}</span>
                        {isMe ? "Payment Sent" : "Payment Received"}
                      </div>
                      <div
                        style={{
                          fontSize: "22px",
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          letterSpacing: "-0.02em",
                          color: "white",
                          marginBottom: "10px",
                        }}
                      >
                        {parsed.amount} <span style={{ fontSize: "14px", color: "#34d399", fontWeight: 600 }}>ETH</span>
                      </div>
                      <a
                        href={`https://sepolia.etherscan.io/tx/${parsed.txHash}`}
                        target="_blank"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#67e8f9",
                          fontSize: "12px",
                          fontWeight: 600,
                          textDecoration: "none",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        View on Etherscan ↗
                      </a>
                    </div>
                  );
                }
              } catch {}

              if (!content) {
                content = (
                  <div
                    style={{
                      padding: "12px 18px",
                      borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      maxWidth: "520px",
                      fontSize: "14px",
                      lineHeight: 1.55,
                      background: isMe
                        ? "linear-gradient(135deg, #7c3aed, #2563eb)"
                        : "rgba(255,255,255,0.06)",
                      border: isMe ? "none" : "1px solid rgba(255,255,255,0.07)",
                      color: "white",
                      boxShadow: isMe ? "0 4px 20px rgba(124,58,237,0.25)" : "none",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.content}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: isMe ? "flex-end" : "flex-start",
                    animation: "fade-in 0.25s ease forwards",
                  }}
                >
                  {!isMe && (
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        fontFamily: "var(--font-display)",
                        marginRight: "8px",
                        flexShrink: 0,
                        alignSelf: "flex-end",
                        marginBottom: "2px",
                      }}
                    >
                      T
                    </div>
                  )}
                  {content}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div
            style={{
              padding: "16px 32px 20px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(10,10,18,0.7)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "6px 6px 6px 20px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                transition: "border-color 0.2s ease",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message…"
                style={{
                  flex: 1,
                  background: "transparent",
                  outline: "none",
                  border: "none",
                  color: "white",
                  fontSize: "14px",
                  fontFamily: "var(--font-body)",
                }}
              />

              {/* Pay button */}
              <button
                onClick={handlePayment}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 18px",
                  borderRadius: "11px",
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  color: "#34d399",
                  fontSize: "13px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                  letterSpacing: "0.01em",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 4.5h10M2 7.5h6M9.5 9.5l2 2M9.5 11.5l2-2" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Pay ETH
              </button>

              {/* Send button */}
              <button
                onClick={handleSend}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px 22px",
                  borderRadius: "11px",
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                  color: "white",
                  fontSize: "13px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                  letterSpacing: "0.01em",
                }}
              >
                Send
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M8 3L12 7L8 11" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
