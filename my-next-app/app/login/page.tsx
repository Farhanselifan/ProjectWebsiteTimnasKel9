"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!emailOrUsername || !password) {
      setError("Email/Username dan password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailOrUsername,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Gagal login.");
        setLoading(false);
        return;
      }

      const token = data?.token;
      if (token) {
        if (remember) {
          localStorage.setItem("auth_token", token);
        } else {
          sessionStorage.setItem("auth_token", token);
        }
      }

      if (data?.role) {
        localStorage.setItem("role", data.role);
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}>
      {/* LEFT PANEL */}
      <div
        style={{
          width: "48%",
          minHeight: "100vh",
          backgroundColor: "#b80000", // merah timnas
          color: "#fff",
          padding: "64px 48px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ alignSelf: "flex-start", maxWidth: 460 }}>
          <h1 style={{ margin: 0, fontSize: 40, fontWeight: 800 }}>
            Timnas Indonesia
          </h1>
          <p style={{ marginTop: 12, opacity: 0.95 }}>
            Merah Putih di Hati, Garuda di Dada
          </p>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* emblem - ganti src sesuai assetmu */}
          <img
            src="/images/garuda.png"
            alt="Garuda"
            style={{
              width: 360,
              height: "auto",
              objectFit: "contain",
              borderRadius: 6,
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              background: "#fff0",
            }}
          />
        </div>

        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              background: "#fff",
              color: "#b80000",
              padding: "10px 18px",
              borderRadius: 10,
              border: "none",
              fontWeight: 700,
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              cursor: "pointer",
            }}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          width: "52%",
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
          boxSizing: "border-box",
          // background image with dim overlay
          backgroundImage: "url('/images/stadium-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.9))",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: 420,
            position: "relative",
            zIndex: 2,
            background: "#fff",
            borderRadius: 16,
            padding: "28px 32px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#b80000", marginTop: 0, marginBottom: 18 }}>
            Masuk ke Profil Timnas
          </h2>

          <button
            type="button"
            onClick={() => alert("Fungsi Google sign-in belum diimplementasikan.")}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "#fff",
              cursor: "pointer",
              marginBottom: 16,
            }}
          >
            <span style={{ fontWeight: 700, color: "#424242" }}>G</span>
            <span style={{ color: "#424242" }}>Masuk dengan Google</span>
          </button>

          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "10px 0 18px" }} />

          <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
            <label style={{ display: "block", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
              Email
            </label>
            <input
              type="text"
              placeholder="Masukkan Email"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                marginBottom: 12,
                boxSizing: "border-box",
              }}
            />

            <label style={{ display: "block", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                marginBottom: 10,
                boxSizing: "border-box",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="remember" style={{ fontSize: 14 }}>
                Ingat saya
              </label>
            </div>

            {error && <p style={{ color: "crimson", marginBottom: 10 }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: "#b80000",
                color: "#fff",
                padding: "11px",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                marginBottom: 12,
              }}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 6, fontSize: 14 }}>
            Belum punya akun?{" "}
            <a href="/signup" style={{ color: "#b80000", fontWeight: 800, textDecoration: "none" }}>
              Daftar Sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
