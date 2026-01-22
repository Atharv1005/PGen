"use client";

import { contacts } from "@/lib/dummyData";
import { useState } from "react";

type Props = {
  onSelect: (chatId: string) => void;
  activeChatId: string;
};

export function Sidebar({ onSelect, activeChatId }: Props) {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter((c) =>
    c.displayName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/60 flex flex-col">
      <div className="p-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search contacts..."
          className="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="px-4 py-3 text-sm text-slate-400 text-center">
            No contacts found
          </div>
        ) : (
          filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-800 transition-colors ${
                activeChatId === c.id ? "bg-slate-800 border-l-2 border-indigo-500" : ""
              }`}
            >
              <div className="font-medium">{c.displayName}</div>
              <div className="text-xs text-slate-400 truncate">{c.wallet}</div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}