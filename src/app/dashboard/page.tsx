"use client";

import socket from "@/lib/socket";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { createChat, getMessages, sendMessage } from "@/lib/api";

export default function Dashboard() {

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState("");
  const [user, setUser] = useState<any>(null);

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

    const msgs = await getMessages(chat._id);

    setMessages(msgs);

  };


  const handleSend = async () => {

    if (!input.trim()) return;
  
    const msg = await sendMessage(chatId, user.id, input);
  
    socket.emit("send_message", msg);
  
    setInput("");
  
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
                  {msg.content}
                </span>

              </div>

            ))}

          </div>


          {/* Input */}
          <div className="flex">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 bg-[#14141A] rounded-lg mr-2"
              placeholder="Type message..."
            />

            <button
              onClick={handleSend}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </main>

  );

}