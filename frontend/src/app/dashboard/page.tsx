"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { MessageInput } from "@/components/chat/MessageInput";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { useWallet } from "@/hooks/useWallet";
import { Message } from "@/lib/types";
import { me, contacts } from "@/lib/dummyData";

export default function DashboardPage() {
  const router = useRouter();
  const { isConnected } = useWallet();

  const [chatId, setChatId] = useState<string>("u1");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Redirect to login if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push("/login");
    }
  }, [isConnected, router]);

  const chatContact = contacts.find((c) => c.id === chatId);

  // Don't render if not connected (prevents flicker)
  if (!isConnected) {
    return null;
  }

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      chatId: chatId,
      senderId: me.id,
      receiverId: chatId,
      ciphertext: text,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    console.log("Message sent:", newMessage);
  };

  const handlePaymentConfirm = (data: {
    amount: string;
    token: string;
    note: string;
  }) => {
    // Create a payment message
    const paymentMessage: Message = {
      id: `payment-${Date.now()}`,
      chatId: chatId,
      senderId: me.id,
      receiverId: chatId,
      ciphertext: `💳 Payment: ${data.amount} ${data.token}${data.note ? ` - ${data.note}` : ""}`,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setMessages((prev) => [...prev, paymentMessage]);
    console.log("Payment initiated:", data);
    // TODO: Execute blockchain transaction
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar activeChatId={chatId} onSelect={setChatId} />
      <div className="flex-1 flex flex-col">
        <ChatWindow chatId={chatId} messages={messages} />
        <MessageInput
          onSend={handleSend}
          onPay={() => setShowPaymentModal(true)}
        />
      </div>

      {chatContact && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          receiverAddress={chatContact.wallet}
          receiverName={chatContact.displayName}
          onConfirm={handlePaymentConfirm}
        />
      )}
    </div>
  );
}