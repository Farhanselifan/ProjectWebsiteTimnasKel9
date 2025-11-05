"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
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

      setSuccessMsg("Registrasi berhasil! Silakan login.");
      // Optional: redirect to login after short delay
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan jaringan. Coba lagi.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/stadium-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "40px",
          width: "100%",
          maxWidth: "480px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#c00",
            marginBottom: "20px",
          }}
        >
          Daftar Akun Baru
        </h2>

        <form onSubmit={handleRegister}>
          <div style={{ textAlign: "left", marginBottom: "10px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>Nama</label>
            <input
              type="text"
              placeholder="Nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "6px",
              }}
              disabled={loading}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "10px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>Email</label>
            <input
              type="email"
              placeholder="email@contoh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "6px",
              }}
              disabled={loading}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "10px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Buat password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "6px",
              }}
              disabled={loading}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "18px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "6px",
                background: "#fff",
              }}
              disabled={loading}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              {/* NOTE: biasanya pembuatan admin harus dibatasi; ini hanya demo */}
            </select>
          </div>

          {error && (
            <p style={{ color: "crimson", marginBottom: "10px" }}>{error}</p>
          )}
          {successMsg && (
            <p style={{ color: "green", marginBottom: "10px" }}>{successMsg}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#c00",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "10px",
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        <p style={{ fontSize: "14px" }}>
          Sudah punya akun?{" "}
          <a
            href="/login"
            style={{
              color: "#c00",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Masuk Sekarang
          </a>
        </p>
      </div>
    </div>
  );
}
