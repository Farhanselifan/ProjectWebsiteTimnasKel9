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
          // backend contoh memakai `email`, jika kamu pakai username ganti sesuai backend
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

      // data.token diharapkan dikembalikan oleh API
      const token = data?.token;
      if (token) {
        // untuk demo: simpan token di localStorage
        // jika ingin lebih aman: gunakan cookie HttpOnly dari server
        if (remember) {
          localStorage.setItem("auth_token", token);
        } else {
          // simpan di sessionStorage jika tidak pilih "ingat saya"
          sessionStorage.setItem("auth_token", token);
        }
      }

      // optional: simpan role juga (data.role)
      if (data?.role) {
        localStorage.setItem("role", data.role);
      }

      // redirect to home or dashboard
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan jaringan. Coba lagi.");
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
          maxWidth: "400px",
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
          Masuk ke Profil Timnas
        </h2>

        <button
          style={{
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            fontWeight: "500",
            cursor: "pointer",
            marginBottom: "20px",
            backgroundColor: "#fff",
          }}
          type="button"
          onClick={() => {
            // placeholder: integrasi Google OAuth bisa ditambahkan nanti
            alert("Fungsi Google sign-in belum diimplementasikan.");
          }}
        >
          G Masuk dengan Google
        </button>

        <hr style={{ margin: "20px 0" }} />

        <form onSubmit={handleLogin}>
          <div style={{ textAlign: "left", marginBottom: "10px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>
              Email / Username
            </label>
            <input
              type="text"
              placeholder="Masukkan Email atau Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
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
              placeholder="Masukkan Password"
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "20px",
            }}
          >
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={loading}
            />
            <label htmlFor="remember" style={{ fontSize: "14px" }}>
              Ingat saya
            </label>
          </div>

          {error && (
            <p style={{ color: "crimson", marginBottom: "10px" }}>{error}</p>
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
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p style={{ fontSize: "14px" }}>
          Belum punya akun?{" "}
          <a
            href="/signup"
            style={{
              color: "#c00",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Daftar Sekarang
          </a>
        </p>
      </div>
    </div>
  );
}
