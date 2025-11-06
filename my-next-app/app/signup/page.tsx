"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!name || !email || !password) {
      setError("Nama, email, dan password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Gagal mendaftar.");
        setLoading(false);
        return;
      }

      setSuccessMsg("Registrasi berhasil! Mengalihkan ke halaman login...");
      setTimeout(() => {
        router.push("/login");
      }, 900);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan jaringan. Coba lagi.");
      setLoading(false);
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
          backgroundColor: "#b80000",
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
              "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.92))",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: 480,
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
            Daftar Akun Baru
          </h2>

          <form onSubmit={handleRegister} style={{ textAlign: "left" }}>
            <label style={{ display: "block", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
              Nama
            </label>
            <input
              type="text"
              placeholder="Nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Email
            </label>
            <input
              type="email"
              placeholder="email@contoh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Buat password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                marginBottom: 16,
                boxSizing: "border-box",
                background: "#fff",
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            {error && <p style={{ color: "crimson", marginBottom: 10 }}>{error}</p>}
            {successMsg && <p style={{ color: "green", marginBottom: 10 }}>{successMsg}</p>}

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
              {loading ? "Mendaftar..." : "Daftar"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 6, fontSize: 14 }}>
            Sudah punya akun?{" "}
            <a href="/login" style={{ color: "#b80000", fontWeight: 800, textDecoration: "none" }}>
              Masuk Sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
