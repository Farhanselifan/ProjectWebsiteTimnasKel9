"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;   // dari DB, misal 750000
  image: string;   // path gambar, misal "/images/store/jersey-home.jpg"
  badge: string;   // Official, Limited, New
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // PENTING:
      // Kalau Express kamu ada di port 5000, pastikan endpoint ini benar
      const res = await fetch("http://localhost:5000/store_items", {
        // optional: cache no-store supaya selalu fresh
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // Kalau backend kirim { items: [...] }
      // ganti ke: const items = data.items;
      // Di sini diasumsikan langsung array
      if (!Array.isArray(data)) {
        throw new Error("Response dari server bukan array produk");
      }

      // Optional: paksa harga ke number (kalau dari DB berupa string)
      const normalized: Product[] = data.map((item: any) => ({
        id: Number(item.id),
        name: String(item.name),
        price: Number(item.price),
        image: String(item.image),
        badge: String(item.badge ?? "Official"),
      }));

      setProducts(normalized);
    } catch (err: any) {
      console.error("Error fetch products:", err);
      setError(err.message ?? "Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="store-page" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Hero Section */}
      <section
        className="store-hero"
        style={{
          textAlign: "center",
          height: "250px",
          padding: "60px 20px",
          background: "linear-gradient(135deg, #e60000, #ff9900)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "30px", marginBottom: "10px" }}>
          Official Store Timnas Indonesia
        </h1>
        <p style={{ fontSize: "13px" }}>
          Dukung Garuda dengan merchandise resmi berkualitas tinggi!
        </p>
        <Link
          href="#products"
          style={{
            display: "inline-block",
            marginTop: "20px",
            background: "white",
            color: "#e60000",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Belanja Sekarang
        </Link>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="content-page"
        style={{ padding: "40px 20px" }}
      >
        <h1
          className="section-title"
          style={{ textAlign: "center", marginBottom: 30 }}
        >
          Produk Tersedia
        </h1>

        {loading && (
          <p style={{ textAlign: "center" }}>Sedang memuat produk...</p>
        )}

        {!loading && error && (
          <p style={{ textAlign: "center", color: "red" }}>
            Gagal memuat produk: {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p style={{ textAlign: "center" }}>Belum ada produk.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <ul
            className="product-list"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((product) => (
              <li key={product.id}>
                <div
                  className="product-card"
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    background: "white",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div className="product-image">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="img-cover"
                      style={{ width: "100%", height: "auto" }}
                      priority
                      // kalau pakai URL eksternal, pastikan ditambahkan di next.config.mjs -> images.remotePatterns
                    />
                  </div>

                  <div
                    className="product-content"
                    style={{
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    <span
                      className="product-badge"
                      style={{
                        alignSelf: "flex-start",
                        padding: "2px 10px",
                        borderRadius: 999,
                        border: "1px solid #ccc",
                        fontSize: 12,
                      }}
                    >
                      {product.badge}
                    </span>

                    <h3 style={{ margin: "4px 0", fontSize: 16 }}>
                      {product.name}
                    </h3>

                    <strong style={{ fontSize: 16, color: "#e60000" }}>
                      {formatRupiah(product.price)}
                    </strong>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Back to Home */}
      <section
        className="back-link"
        style={{ textAlign: "center", paddingBottom: "40px" }}
      >
        <Link href="/" style={{ color: "#0066cc", textDecoration: "none" }}>
          ← Kembali ke Beranda
        </Link>
      </section>
    </main>
  );
}
