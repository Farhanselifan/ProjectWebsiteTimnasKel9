"use client";

import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Password dan konfirmasi tidak sama!");
      return;
    }
    alert(`Akun berhasil dibuat untuk: ${username}`);
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
          maxWidth: "420px",
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
          Daftar Akun Timnas
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
          G Daftar dengan Google
        </button>

        <hr style={{ margin: "20px 0" }} />

        <form onSubmit={handleSignup}>
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
              required
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "10px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>Email</label>
            <input
              type="email"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "6px",
              }}
              required
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
              required
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>
              Konfirmasi Password
            </label>
            <input
              type="password"
              placeholder="Ulangi Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "6px",
              }}
              required
            />
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
            Daftar
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
