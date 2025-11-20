"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  brand?: string;
  stock?: number;
  size?: string;
  color?: string;
  image?: string;
  description?: string;
  stats?: {
    sold?: number;
    rating?: number; // 1–5
    reviews?: number;
  };
};

// SMALL IMAGE WRAPPER: uses next/image but falls back to <img> when there is an error
function ImageWrapper({ src, alt }: { src: string; alt: string }) {
  const [fail, setFail] = React.useState(false);
  const finalSrc = src || "/images/store/default.png";

  if (fail) {
    return (
      // final fallback
      <img
        src={finalSrc}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/store/default.png";
        }}
      />
    );
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      fill
      style={{ objectFit: "cover" }}
      sizes="(max-width: 1024px) 100vw, 360px"
      onError={() => setFail(true)}
      unoptimized
    />
  );
}

// static data (bisa diganti fetch dari API / DB)
const PRODUCTS: Product[] = [
  {
    id: "jersey-home",
    name: "Jersey Home 24/25",
    price: 750000,
    category: "Jersey",
    brand: "FC",
    stock: 25,
    size: "S / M / L / XL",
    color: "Merah",
    image: "/images/store/jersey-home.jpg",
    description:
      "Jersey home resmi musim 24/25 dengan bahan ringan dan breathable. Cocok untuk main bola maupun dipakai harian.",
    stats: { sold: 120, rating: 4.8, reviews: 35 },
  },
  {
    id: "jersey-away",
    name: "jersey-away",
    price: 720000,
    category: "Jersey",
    brand: "FC",
    stock: 10,
    size: "M / L / XL",
    color: "Putih",
    image: "/images/store/jersey-away.jpg",
    description:
      "Jersey away dengan desain minimalis dan elegan. Tetap nyaman meski dipakai dalam waktu lama.",
    stats: { sold: 80, rating: 4.6, reviews: 21 },
  },
  {
    id: "bundle",
    name: "Scarf Ultras",
    price: 150000,
    category: "Merchandise",
    brand: "fg",
    stock: 50,
    size: "All Size",
    color: "Merah Hitam",
    image: "/images/store/scarf-ultras.jpg",
    description:
      "Scarf supporter untuk mendukung tim kebanggaanmu di stadion maupun nonton bareng.",
    stats: { sold: 200, rating: 4.9, reviews: 50 },
  },
];

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams(); // <--- gunakan hook ini untuk client component
  const id = (params as any)?.id ?? null;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!id) {
      setProduct(null);
      setLoading(false);
      return;
    }
    const p = PRODUCTS.find((x) => String(x.id) === String(id)) ?? null;
    setProduct(p);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <main style={{ padding: 32, fontFamily: "Inter, Arial, sans-serif" }}>
        <p>Memuat...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main style={{ padding: 32, fontFamily: "Inter, Arial, sans-serif" }}>
        <section
          style={{
            textAlign: "center",
            padding: "40px 20px",
            background: "linear-gradient(135deg,#e60000,#ff9900)",
            color: "white",
            borderRadius: 8,
          }}
        >
          <h1 style={{ margin: 0, fontSize: 22 }}>Produk Tidak Ditemukan</h1>
          <p style={{ marginTop: 8 }}>ID: {id ?? "—"}</p>
          <div style={{ marginTop: 12 }}>
            <Link
              href="/store"
              style={{
                background: "#fff",
                color: "#e60000",
                padding: "8px 14px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Kembali ke Store
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!product.stock || product.stock <= 0) {
      alert("Stok produk habis.");
      return;
    }
    if (qty <= 0) {
      alert("Minimal 1 item.");
      return;
    }
    if (product.stock && qty > product.stock) {
      alert("Jumlah melebihi stok tersedia.");
      return;
    }

    setAdding(true);
    // nanti bisa diganti call API cart
    setTimeout(() => {
      alert(
        `Berhasil menambahkan ${qty} x ${product.name} ke keranjang.\nTotal: ${formatRupiah(
          product.price * qty
        )}`
      );
      setAdding(false);
    }, 300);
  };

  return (
    <main style={{ fontFamily: "Inter, Arial, sans-serif", paddingBottom: 48 }}>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg,#e60000,#ff9900)",
          color: "white",
          padding: "36px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "0.4px" }}>
            {product.name}
          </h1>
          <p style={{ marginTop: 6, opacity: 0.95 }}>
            {product.category} • {product.brand ?? "Official Store"}
          </p>
          <p style={{ marginTop: 10, fontSize: 20, fontWeight: 700 }}>
            {formatRupiah(product.price)}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "28px 20px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "360px 1fr",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Photo */}
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
              background: "#fff",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: 360 }}>
              <ImageWrapper
                src={product.image ?? "/images/store/default.png"}
                alt={product.name}
              />
            </div>

            <div style={{ padding: 16 }}>
              <h2 style={{ margin: "6px 0", fontSize: 18 }}>{product.name}</h2>
              <p style={{ margin: "6px 0", color: "#555" }}>
                {product.category} • {product.brand ?? "Official"}
              </p>

              <p
                style={{
                  margin: "6px 0",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#e60000",
                }}
              >
                {formatRupiah(product.price)}
              </p>

              <p style={{ margin: "4px 0", fontSize: 14, color: "#666" }}>
                Stok:{" "}
                <strong>
                  {product.stock && product.stock > 0
                    ? product.stock
                    : "Habis"}
                </strong>
              </p>

              <div style={{ marginTop: 12 }}>
                <label
                  htmlFor="qty"
                  style={{ fontSize: 14, marginRight: 8 }}
                >
                  Jumlah:
                </label>
                <input
                  id="qty"
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  style={{
                    width: 70,
                    padding: "6px 8px",
                    borderRadius: 6,
                    border: "1px solid #ddd",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 14,
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={handleAddToCart}
                  disabled={adding || !product.stock || product.stock <= 0}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: "none",
                    background:
                      !product.stock || product.stock <= 0
                        ? "#ccc"
                        : "#e60000",
                    color: "#fff",
                    fontWeight: 700,
                    cursor:
                      !product.stock || product.stock <= 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {adding ? "Menambahkan..." : "Tambah ke Keranjang"}
                </button>

                <Link
                  href="/store"
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "#fff",
                    color: "#333",
                    fontSize: 14,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  ← Kembali ke Store
                </Link>
              </div>
            </div>
          </div>

          {/* Details */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <h3 style={{ color: "#e60000", margin: 0 }}>Detail Produk</h3>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 12,
                    color: "#888",
                    marginTop: 6,
                  }}
                >
                  ID Produk: {product.id}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 20, marginTop: 18 }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "8px 0", fontWeight: 700 }}>Nama</p>
                <p style={{ margin: "6px 0 12px" }}>{product.name}</p>

                <p style={{ margin: "8px 0", fontWeight: 700 }}>Kategori</p>
                <p style={{ margin: "6px 0 12px" }}>{product.category}</p>

                <p style={{ margin: "8px 0", fontWeight: 700 }}>Brand</p>
                <p style={{ margin: "6px 0 12px" }}>
                  {product.brand ?? "Official Store"}
                </p>

                <p style={{ margin: "8px 0", fontWeight: 700 }}>
                  Varian / Warna
                </p>
                <p style={{ margin: "6px 0 12px" }}>
                  {product.size ?? "—"} • {product.color ?? "—"}
                </p>
              </div>

              <div style={{ width: 220 }}>
                <p style={{ margin: "8px 0", fontWeight: 700 }}>Statistik</p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    marginTop: 8,
                    fontSize: 14,
                  }}
                >
                  <li style={{ marginBottom: 8 }}>
                    <strong>Terjual:</strong> {product.stats?.sold ?? 0} pcs
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    <strong>Rating:</strong>{" "}
                    {product.stats?.rating
                      ? `${product.stats.rating.toFixed(1)} / 5`
                      : "Belum ada rating"}
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    <strong>Ulasan:</strong> {product.stats?.reviews ?? 0}{" "}
                    review
                  </li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <p style={{ margin: 0, fontWeight: 700 }}>Deskripsi</p>
              <p style={{ marginTop: 8, lineHeight: 1.6 }}>
                {product.description ??
                  "Belum ada deskripsi untuk produk ini."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
