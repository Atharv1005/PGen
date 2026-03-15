"use client";

import { useState } from "react";

export default function PaymentModal({
  onPay,
  onClose
}: {
  onPay: (amount: string) => void;
  onClose: () => void;
}) {

  const [amount, setAmount] = useState("");

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-icon">
          💸
        </div>

        <div className="modal-title">
          Send ETH
        </div>

        <div className="modal-body">
          Enter the amount you want to send.
        </div>

        <input
          className="input-field"
          placeholder="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        <div className="modal-actions">

          <button
            className="btn-ghost"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn-primary"
            onClick={() => onPay(amount)}
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}