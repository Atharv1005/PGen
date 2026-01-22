"use client";

import { contacts, me } from "@/lib/dummyData";
import { Message } from "@/lib/types";

type Props = {
  chatId: string;
  messages: Message[];
};

export function ChatWindow({ chatId, messages }: Props) {
  const chatContact = contacts.find((c) => c.id === chatId);
  const thread = messages.filter((m) => m.chatId === chatId);

  if (!chatContact) {
    return (
      <section className="flex-1 flex flex-col bg-slate-900/40 items-center justify-center">
        <p className="text-slate-400">Select a contact to start chatting</p>
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col bg-slate-900/40">
      <header className="h-14 border-b border-slate-800 flex items-center px-4 bg-slate-900/80">
        <div>
          <div className="font-medium">{chatContact.displayName}</div>
          <div className="text-xs text-slate-400">{chatContact.wallet}</div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {thread.length === 0 ? (
          <div className="text-center text-slate-400 mt-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          thread.map((m) => {
            const isMe = m.senderId === me.id;
            return (
              <div
                key={m.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md rounded-lg px-3 py-2 text-sm ${
                    isMe
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  <div className="text-xs opacity-80 mb-1">
                    {isMe ? "You" : chatContact.displayName}
                  </div>
                  <div>{m.ciphertext}</div>
                  <div className="text-xs opacity-60 mt-1">
                    {new Date(m.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}