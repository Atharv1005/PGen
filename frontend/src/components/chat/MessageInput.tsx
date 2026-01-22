"use client";

import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
  onPay?: () => void;
  disabled?: boolean;
};

export function MessageInput({ onSend, onPay, disabled = false }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-slate-800 p-3 bg-slate-900/60">
      <div className="flex items-center gap-2 mb-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message... (Press Enter to send)"
          disabled={disabled}
          className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className="rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm font-medium transition-colors"
        >
          Send
        </button>
      </div>
      {onPay && (
        <button
          onClick={onPay}
          disabled={disabled}
          className="w-full rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span>💳</span>
          Pay
        </button>
      )}
    </div>
  );
}