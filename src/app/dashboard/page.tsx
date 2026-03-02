"use client";

import socket from "@/lib/socket";
import Navbar from "@/components/Navbar";
import { sendCrypto } from "@/lib/wallet";
import { useEffect, useState } from "react";
import { createChat, getMessages, sendMessage } from "@/lib/api";

export default function Dashboard() {

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
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
  
    return () => {
  
      socket.off("receive_message");
  
    };
  
  }, []);


  const initializeChat = async (userId: string) => {

    const chat = await createChat(userId, secondUserId);

    setChatId(chat._id);

    socket.emit("join_chat", chat._id);

    const otherUser = chat.participants.find((p: any) => p._id !== userId);

    if(otherUser) {
      setRecipientWallet(otherUser.walletAddress);
    } else{
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

    if(!recipientWallet) {
      alert("Recipient has not connected wallet");
      return;
    }

    const amount=prompt("Enter amount in ETH");

    if(!amount) return;

    const txHash = await sendCrypto(recipientWallet, amount);

    if(txHash) {
      const paymentMessage={
        type: "payment",
        amount,
        txHash
      };

      const msg=await sendMessage(
        chatId,
        user.id,
        JSON.stringify(paymentMessage)
      );
      socket.emit("send_message", msg);
    }
  };


  return (

    <main className="min-h-screen bg-[#0B0B0F] text-white">

      <Navbar />

      <div className="flex h-[90vh]">

        {/* Sidebar */}
        <div className="w-[300px] bg-[#14141A] p-4">

          <h2 className="font-bold mb-4">Chats</h2>

          <div className="p-3 bg-[#1f1f28] rounded-lg">
            Test User
          </div>

        </div>


        {/* Chat Window */}
        <div className="flex flex-col flex-1 p-4">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4">

            {messages.map((msg, index) => (

              <div key={index} className="mb-2">

                <span className="bg-[#1f1f28] p-2 rounded-lg inline-block">
                  {(()=>{
                    try{
                      const parsed=JSON.parse(msg.content);
                      if(parsed.type==="payment"){
                        return(
                          <div className="bg-green-700 p-3 rounded-lg">
                            <p>💸 Payment Sent</p>
                            <p>{parsed.amount} ETH</p>
                            <a 
                              href={`https://sepolia.etherscan.io/tx/${parsed.txHash}`}
                              target="_blank" 
                              className="text-blue-300 underline"
                            >
                              View Transaction
                            </a>
                          </div>
                        );
                      }
                    } catch {}

                    return(
                      <span className="bg-[#1f1f28] p-2 rounded-lg inline-block">
                        {msg.content}
                      </span>
                    );

                  })()}
                </span>

              </div>

            ))}

          </div>


          {/* Input */}
          <div className="flex gap-2">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 bg-[#14141A] rounded-lg"
              placeholder="Type message..."
            />

            <button
              onClick={handleSend}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
            >
              Send
            </button>

            <button
              onClick={handlePayment}
              className="px-6 py-3 bg-green-600 rounded-lg"
            >
              Pay
            </button>

          </div>

        </div>

      </div>

    </main>

  );

}