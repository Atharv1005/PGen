import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", color: "white", position: "relative", overflow: "hidden" }}>

      <Navbar />

      {/* Hero glow orbs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "8%",
          left: "15%",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          animation: "glow-pulse 5s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          animation: "glow-pulse 7s ease-in-out infinite 2s",
        }}
      />

      {/* Hero */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
          minHeight: "calc(90vh - 68px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Tag pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "100px",
            border: "1px solid rgba(124,58,237,0.35)",
            background: "rgba(124,58,237,0.1)",
            fontSize: "12px",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#a78bfa",
            marginBottom: "32px",
            animation: "float-up 0.6s ease forwards",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#a78bfa",
              boxShadow: "0 0 8px #a78bfa",
            }}
          />
          Web2 + Web3 Platform
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(44px, 8vw, 84px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            maxWidth: "900px",
            marginBottom: "28px",
            animation: "float-up 0.7s ease 0.1s forwards",
            opacity: 0,
          }}
        >
          Secure Messaging
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Meets Crypto Payments
          </span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            color: "rgba(240,240,248,0.5)",
            maxWidth: "480px",
            fontSize: "17px",
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: "48px",
            animation: "float-up 0.7s ease 0.2s forwards",
            opacity: 0,
          }}
        >
          Chat in real-time and send crypto instantly.
          A hybrid communication platform built for the open internet.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "float-up 0.7s ease 0.3s forwards",
            opacity: 0,
          }}
        >
          <a
            href="/signup"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 36px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              color: "white",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "0.01em",
              boxShadow: "0 4px 32px rgba(124,58,237,0.45), 0 0 0 1px rgba(124,58,237,0.2)",
              transition: "all 0.2s ease",
            }}
          >
            Get Started Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href="/login"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 36px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(240,240,248,0.8)",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "15px",
              border: "1px solid rgba(255,255,255,0.09)",
              transition: "all 0.2s ease",
            }}
          >
            Sign In
          </a>
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "72px",
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "float-up 0.7s ease 0.45s forwards",
            opacity: 0,
          }}
        >
          {[
            { icon: "🔐", label: "End-to-end encrypted" },
            { icon: "⚡", label: "Instant ETH transfers" },
            { icon: "🌐", label: "Decentralized identity" },
          ].map((f) => (
            <div
              key={f.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "100px",
                background: "rgba(14,14,24,0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                fontSize: "13px",
                color: "rgba(240,240,248,0.65)",
                fontWeight: 500,
              }}
            >
              <span>{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "40px 80px",
          display: "flex",
          justifyContent: "center",
          gap: "80px",
          flexWrap: "wrap",
          background: "rgba(14,14,24,0.4)",
          backdropFilter: "blur(12px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {[
          { value: "256-bit", label: "Encryption" },
          { value: "< 100ms", label: "Message delivery" },
          { value: "EVM", label: "Compatible chains" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "28px",
                fontWeight: 800,
                background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: "13px", color: "rgba(240,240,248,0.4)", marginTop: "4px", fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>

    </main>
  );
}
