"use client";

import { useState } from "react";

export default function WalletModal({
  onConnect,
  onClose
}: {
  onConnect: (address: string) => void;
  onClose: () => void;
}) {

  const [address, setAddress] = useState("");

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-icon">
          🦊
        </div>

        <div className="modal-title">
          Connect Wallet
        </div>

        <div className="modal-body">
          Enter your wallet address to link it with your account.
        </div>

        <input
          className="input-field"
          placeholder="0x..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
            onClick={() => onConnect(address)}
          >
            Connect
          </button>

        </div>

      </div>

    </div>
  );
}