"use client";
import { useState } from "react";

export default function ProductClient({ id }: { id: string }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = ["S", "M", "L", "XL"];

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        padding: "40px 20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          padding: "40px",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <img
          src={`/images/store/jersey-away.jpg`}
          alt={`Product ${id}`}
          style={{
            width: "100%",
            maxWidth: "280px",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        />

        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#000",
            marginBottom: "12px",
          }}
        >
          Product ID: {id}
        </h1>

        <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
          Ukuran tersedia:
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "24px" }}>
          {sizes.map((size) => (
            <div
              key={size}
              onClick={() => setSelectedSize(size)}
              style={{
                padding: "10px 18px",
                borderRadius: "6px",
                border: selectedSize === size ? "2px solid #00AA5B" : "1px solid #ccc",
                backgroundColor: selectedSize === size ? "#E8F5E9" : "#fff",
                cursor: "pointer",
                fontWeight: "600",
                color: "#000",
              }}
            >
              {size}
            </div>
          ))}
        </div>

        <p style={{ fontSize: "32px", fontWeight: "700", color: "#000", marginBottom: "24px" }}>
          Rp219.000
        </p>

        <button
          style={{
            backgroundColor: "#00AA5B",
            color: "white",
            border: "none",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: "600",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Beli Langsung
        </button>

        <div style={{ marginTop: "25px" }}>
          <a
            href="/store"
            style={{
              fontSize: "14px",
              color: "#00AA5B",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  );
}
