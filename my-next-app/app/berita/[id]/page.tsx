"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Berita = {
  id: string;
  judul: string;
  penulis: string;
  tanggal: string;
  kategori: string;
  gambar?: string;
  isi: string;
};

export default function DetailBeritaPage() {
  const params = useParams();
  const id = (params as any)?.id ?? null;

  const [berita, setBerita] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/berita.json");
        const semuaBerita: Berita[] = await res.json();
        const found = semuaBerita.find((b) => b.id === id) ?? null;
        setBerita(found);
      } catch (err) {
        console.error("Gagal memuat berita:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <p>Memuat berita...</p>
      </main>
    );
  }

  if (!berita) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <h2>Berita tidak ditemukan 😢</h2>
        <Link href="/berita" style={{ color: "#e60000", fontWeight: 600 }}>
          ← Kembali ke Daftar Berita
        </Link>
      </main>
    );
  }

  return (
    <main
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        paddingBottom: "60px",
      }}
    >
      {/* Header / Hero */}
      <section
        style={{
          background: "linear-gradient(135deg,#e60000,#ff9900)",
          color: "white",
          padding: "50px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 32 }}>{berita.judul}</h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>
            {berita.kategori} • {new Date(berita.tanggal).toLocaleDateString("id-ID")}  
            <br />
            <span style={{ fontStyle: "italic", fontSize: 14 }}>
              Oleh {berita.penulis}
            </span>
          </p>
        </div>
      </section>

      {/* Isi Berita */}
      <section style={{ padding: "40px 20px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Gambar utama */}
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Image
              src={berita.gambar ?? "/images/berita/default.jpg"}
              alt={berita.judul}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1024px) 100vw, 900px"
              unoptimized
            />
          </div>

          {/* Konten */}
          <div style={{ padding: "30px 40px" }}>
            <p style={{ lineHeight: 1.8, fontSize: 16, color: "#333" }}>
              {berita.isi}
            </p>

            <hr style={{ margin: "30px 0", border: "none", borderTop: "1px solid #eee" }} />

            <div style={{ textAlign: "right" }}>
              <Link
                href="/berita"
                style={{
                  color: "#0066cc",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                ← Kembali ke Daftar Berita
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
