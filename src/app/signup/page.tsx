"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { signupUser } from "@/lib/api";
import { useRouter } from "next/navigation";

const inputFields = [
  { name: "name",            label: "Full Name",        placeholder: "Jane Doe",           type: "text"     },
  { name: "email",           label: "Email Address",    placeholder: "jane@example.com",   type: "email"    },
  { name: "phone",           label: "Phone Number",     placeholder: "+1 (555) 000-0000",  type: "tel"      },
  { name: "username",        label: "Username",         placeholder: "@janedoe",           type: "text"     },
  { name: "password",        label: "Password",         placeholder: "••••••••••",         type: "password" },
  { name: "confirmPassword", label: "Confirm Password", placeholder: "••••••••••",         type: "password" },
];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", username: "", password: "", confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const response = await signupUser(form);
    setLoading(false);

    if (response.message === "User registered successfully") {
      router.push("/login");
    } else {
      setError(response.message);
    }
  };

  return (
    <main style={{ minHeight: "100vh", color: "white", position: "relative", overflow: "hidden" }}>
      <Navbar />

      {/* Glow orbs */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "20%",
          right: "5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          bottom: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          minHeight: "calc(100vh - 68px)",
          padding: "40px 24px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "460px",
            animation: "float-up 0.5s ease forwards",
          }}
        >
          {/* Card */}
          <div
            style={{
              background: "rgba(14,14,24,0.8)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: "0 8px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1)",
            }}
          >
            {/* Logo + heading */}
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "13px",
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 24px rgba(124,58,237,0.4)",
                  marginBottom: "20px",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L15 5V11L8 15L1 11V5L8 1Z" stroke="white" strokeWidth="1.5" fill="none" />
                  <path d="M8 4L12 6.5V9.5L8 12L4 9.5V6.5L8 4Z" fill="white" opacity="0.8" />
                </svg>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  marginBottom: "6px",
                }}
              >
                Create your account
              </h2>
              <p style={{ color: "rgba(240,240,248,0.4)", fontSize: "14px" }}>
                Join PGen — takes less than a minute
              </p>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  color: "#fca5a5",
                  fontSize: "13px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>⚠</span> {error}
              </div>
            )}

            {/* Form — two columns for larger fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "26px" }}>

              {/* Row: Name + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {inputFields.slice(0, 2).map((f) => (
                  <div key={f.name}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: "rgba(240,240,248,0.4)",
                        marginBottom: "8px",
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      className="input-field"
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              {/* Row: Phone + Username */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {inputFields.slice(2, 4).map((f) => (
                  <div key={f.name}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: "rgba(240,240,248,0.4)",
                        marginBottom: "8px",
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      className="input-field"
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              {/* Password fields — full width */}
              {inputFields.slice(4).map((f) => (
                <div key={f.name}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: "rgba(240,240,248,0.4)",
                      marginBottom: "8px",
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="input-field"
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "13px",
                background: loading
                  ? "rgba(124,58,237,0.5)"
                  : "linear-gradient(135deg, #7c3aed, #2563eb)",
                color: "white",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "0.01em",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 24px rgba(124,58,237,0.35)",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  Creating account...
                </>
              ) : "Create Account →"}
            </button>

            {/* Divider + terms */}
            <p
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontSize: "13px",
                color: "rgba(240,240,248,0.35)",
                lineHeight: 1.6,
              }}
            >
              Already have an account?{" "}
              <a
                href="/login"
                style={{
                  color: "#a78bfa",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
