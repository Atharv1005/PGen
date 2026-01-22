"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  receiverAddress: string;
  receiverName: string;
  onConfirm: (data: {
    amount: string;
    token: string;
    note: string;
  }) => void;
};

export function PaymentModal({
  isOpen,
  onClose,
  receiverAddress,
  receiverName,
  onConfirm,
}: Props) {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("USDT");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setLoading(true);
    // TODO: Connect wallet and execute transaction
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate

    onConfirm({ amount, token, note });
    setLoading(false);
    handleClose();
  };

  const handleClose = () => {
    setAmount("");
    setToken("USDT");
    setNote("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl border border-slate-800 w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Send Payment</h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 p-3 bg-slate-800 rounded-lg">
          <div className="text-xs text-slate-400 mb-1">To</div>
          <div className="font-medium">{receiverName}</div>
          <div className="text-xs text-slate-400 truncate">{receiverAddress}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className="w-full rounded-lg bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Token
            </label>
            <select
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full rounded-lg bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="USDT">USDT</option>
              <option value="ETH">ETH</option>
              <option value="MATIC">MATIC</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note for this payment..."
              rows={3}
              className="w-full rounded-lg bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-lg bg-slate-700 hover:bg-slate-600 px-4 py-2 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!amount || parseFloat(amount) <= 0 || loading}
              className="flex-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm font-medium transition-colors"
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}