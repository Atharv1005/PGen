"use client";

import { useState } from "react";

export default function PaymentSheet({
  onClose,
  onSend
}: {
  onClose: () => void;
  onSend: (chain: string, amount: string) => Promise<any>;
}) {

  const [step, setStep] = useState<"select" | "amount" | "success">("select");
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [closing, setClosing] = useState(false);

  const coins = [
    { name: "Ethereum", symbol: "ETH", chain: "ethereum" },
    { name: "Bitcoin", symbol: "BTC", chain: "bitcoin" },
    { name: "Solana", symbol: "SOL", chain: "solana" },
    { name: "Litecoin", symbol: "LTC", chain: "litecoin" },
    { name: "USD Coin", symbol: "USDC", chain: "ethereum" }
  ];

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div className="sheet-overlay" onClick={handleClose}>

      <div
        className={`sheet-container ${closing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >

        <div className="sheet-handle" />

        {/* STEP 1: SELECT */}
        {step === "select" && (
          <>
            <div className="sheet-title">Choose a coin to send</div>

            {coins.map((coin) => (
              <div
                key={coin.symbol}
                className="coin-card"
                onClick={() => {
                  setSelectedCoin(coin);
                  setStep("amount");
                }}
              >
                <div className="coin-left">
                  <div className="coin-icon">{coin.symbol[0]}</div>
                  <div>
                    <div className="coin-name">{coin.name}</div>
                    <div className="coin-symbol">{coin.symbol}</div>
                  </div>
                </div>
                <div>→</div>
              </div>
            ))}
          </>
        )}

        {/* STEP 2: AMOUNT */}
        {step === "amount" && (
          <>
            <div className="sheet-title">
              Send {selectedCoin?.symbol}
            </div>

            <input
              className="sheet-input"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button
              className="sheet-send-btn"
              disabled={loading}
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
              onClick={async () => {

                if (!amount || loading) return;

                try {
                  setLoading(true);
                  setError("");

                  const result=await onSend(selectedCoin.chain, amount);
                  
                  if(result===false){
                    return;
                  }
                  setStep("success");

                  // auto close after success
                  setTimeout(() => {
                    handleClose();
                  }, 1500);

                } catch (err: any) {
                  setError("Transaction failed");
                } finally {
                  setLoading(false);
                }

              }}
            >
              {loading ? "Sending..." : "Send"}
            </button>

            {error && (
              <div className="sheet-error">{error}</div>
            )}
          </>
        )}

        {/* STEP 3: SUCCESS */}
        {step === "success" && (
          <div className="sheet-success">
            <div className="success-icon">✔</div>
            <div style={{ fontWeight: 600 }}>
              Payment Sent
            </div>
          </div>
        )}

      </div>
    </div>
  );
}