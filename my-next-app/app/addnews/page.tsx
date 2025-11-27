"use client";
import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";

export type News = {
  id: number;
  title: string;
  description: string;
  date: string;
  news_images: string;
};

type NewsForm = Omit<News, "id">;

export default function AddNewsPage() {
  const [formData, setFormData] = useState<NewsForm>({
    title: "",
    description: "",
    news_images: "",
    date: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const url = `http://localhost:5000/news`;
      const method = "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal menyimpan berita");
      }

      setSuccess("Berita berhasil disimpan.");

      setFormData({
        title: "",
        description: "",
        news_images: "",
        date: "",
      });
      setEditingId(null);

      console.log("Saved news:", data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="content-page">
      <div className="news-form-wrapper">
        <h2>{editingId ? "Edit Berita" : "Tambah Berita Baru"}</h2>

        <form onSubmit={handleSubmit} className="news-form">
          <div className="form-group">
            <label>Judul</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Judul berita"
              required
            />
          </div>

          <div className="form-group">
            <label>Deskripsi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Isi singkat berita"
              required
            />
          </div>

          <div className="form-group">
            <label>URL Gambar</label>
            <input
              type="text"
              name="news_images"
              value={formData.news_images}
              onChange={handleChange}
              placeholder="https://contoh.com/gambar.jpg"
              required
            />
          </div>

          <div className="form-group">
            <label>Tanggal</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Contoh: 17 September 2025"
            />
          </div>

          <button type="submit" disabled={loading}>
            {editingId ? "Update Berita" : "Tambah Berita"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: "",
                  description: "",
                  news_images: "",
                  date: "",
                });
              }}
            >
              Batal Edit
            </button>
          )}

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
        </form>

        <div style={{ marginTop: "1rem" }}>
          <Link href="/" className="link-back">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
