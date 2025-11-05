"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Logged in as: ${username}`);
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
        >
          G Masuk dengan Google
        </button>

        <hr style={{ margin: "20px 0" }} />

        <form onSubmit={handleLogin}>
          <div style={{ textAlign: "left", marginBottom: "10px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Masukkan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "6px",
              }}
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
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" style={{ fontSize: "14px" }}>
              Ingat saya
            </label>
          </div>

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
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Masuk
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
