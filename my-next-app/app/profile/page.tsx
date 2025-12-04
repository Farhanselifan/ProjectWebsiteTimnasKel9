"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type UserProfile = {
  name: string;
  email: string;
  description?: string;
  profilePic?: string;
  role: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State untuk form edit
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    profilePic: "",
    newPassword: "",
  });

  // Fetch data user saat load
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setFormData({
            username: data.name,
            description: data.description || "",
            profilePic: data.profilePic || "",
            newPassword: "",
          });
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // Fungsi Logout
  const handleLogout = () => {
    if (confirm("Yakin ingin keluar?")) {
      localStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_token");
      localStorage.removeItem("role");
      router.push("/login");
    }
  };

  // Fungsi Simpan Perubahan
  const handleSave = async () => {
    const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setEditingSection(null);
        alert("Profil berhasil diperbarui!");
        // Reset password field
        setFormData(prev => ({ ...prev, newPassword: "" }));
      } else {
        alert("Gagal memperbarui profil.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    }
  };

  if (loading) return <div className="p-10 text-center">Memuat profil...</div>;
  if (!user) return null;

  // Style untuk tombol menu (Kotak, Rounded dikit, Rata kiri, Highlight Merah)
  const buttonStyle = {
    width: "100%",
    padding: "16px 20px",
    marginBottom: "12px",
    textAlign: "left" as const,
    background: "white",
    border: "2px solid #eee",
    borderRadius: "8px", // Rounded dikit
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  // Helper function untuk handling hover via inline style (agak tricky di React inline, lebih baik pake className tailwind kalau bisa, tapi ini pake style object sesuai request logic)
  const activeClass = "hover:border-[#e60000] hover:text-[#e60000] hover:bg-red-50";

  return (
    <main style={{ minHeight: "90vh", background: "#f9f9fb", paddingBottom: "40px" }}>
      {/* Header Background Merah */}
      <div style={{ height: "200px", background: "linear-gradient(135deg, #b80000, #e60000)" }}></div>

      <div className="container" style={{ maxWidth: "800px", margin: "-100px auto 0", padding: "0 20px" }}>
        
        {/* === SECTION FOTO PROFIL === */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              width: "180px", // Agak gede
              height: "180px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "6px solid white",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              margin: "0 auto",
              position: "relative",
              background: "#fff",
            }}
          >
            <img
              src={user.profilePic || "https://via.placeholder.com/180?text=User"}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <h2 style={{ marginTop: "16px", fontSize: "28px", fontWeight: "800", color: "#333" }}>
            {user.name}
          </h2>
          <p style={{ color: "#666", fontSize: "16px", marginTop: "4px" }}>{user.email}</p>
          <p style={{ color: "#888", fontStyle: "italic", marginTop: "8px", maxWidth: "600px", margin: "8px auto" }}>
            "{user.description || "Belum ada deskripsi diri."}"
          </p>
        </div>

        {/* === MENU GRID === */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
          
          {/* USERNAME SETTING */}
          <div>
            <button 
              className={activeClass} 
              style={buttonStyle}
              onClick={() => setEditingSection(editingSection === "username" ? null : "username")}
            >
              <span>👤 Ganti Username</span>
              <span>{editingSection === "username" ? "▲" : "▼"}</span>
            </button>
            {editingSection === "username" && (
              <div style={{ background: "white", padding: "20px", borderRadius: "8px", marginBottom: "12px", border: "1px solid #eee" }}>
                <label className="block text-sm font-bold mb-2">Username Baru</label>
                <input 
                  type="text" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button onClick={handleSave} className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700">Simpan Username</button>
              </div>
            )}
          </div>

          {/* BIO SETTING */}
          <div>
            <button 
              className={activeClass} 
              style={buttonStyle}
              onClick={() => setEditingSection(editingSection === "bio" ? null : "bio")}
            >
              <span>📝 Ganti Deskripsi Diri</span>
              <span>{editingSection === "bio" ? "▲" : "▼"}</span>
            </button>
            {editingSection === "bio" && (
              <div style={{ background: "white", padding: "20px", borderRadius: "8px", marginBottom: "12px", border: "1px solid #eee" }}>
                <label className="block text-sm font-bold mb-2">Deskripsi / Bio</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Ceritakan sedikit tentang dirimu..."
                />
                <button onClick={handleSave} className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700">Simpan Deskripsi</button>
              </div>
            )}
          </div>

          {/* PHOTO SETTING */}
          <div>
            <button 
              className={activeClass} 
              style={buttonStyle}
              onClick={() => setEditingSection(editingSection === "photo" ? null : "photo")}
            >
              <span>🖼️ Ganti Foto Profil</span>
              <span>{editingSection === "photo" ? "▲" : "▼"}</span>
            </button>
            {editingSection === "photo" && (
              <div style={{ background: "white", padding: "20px", borderRadius: "8px", marginBottom: "12px", border: "1px solid #eee" }}>
                <label className="block text-sm font-bold mb-2">URL Gambar Baru</label>
                <input 
                  type="text" 
                  value={formData.profilePic}
                  onChange={(e) => setFormData({...formData, profilePic: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="https://example.com/foto.jpg"
                />
                <div className="text-xs text-gray-500 mb-4">*Masukkan link gambar langsung</div>
                <button onClick={handleSave} className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700">Simpan Foto</button>
              </div>
            )}
          </div>

          {/* PASSWORD SETTING */}
          <div>
            <button 
              className={activeClass} 
              style={buttonStyle}
              onClick={() => setEditingSection(editingSection === "password" ? null : "password")}
            >
              <span>🔒 Ganti Password</span>
              <span>{editingSection === "password" ? "▲" : "▼"}</span>
            </button>
            {editingSection === "password" && (
              <div style={{ background: "white", padding: "20px", borderRadius: "8px", marginBottom: "12px", border: "1px solid #eee" }}>
                <label className="block text-sm font-bold mb-2">Password Baru</label>
                <input 
                  type="password" 
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Minimal 6 karakter"
                />
                <button onClick={handleSave} className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700">Update Password</button>
              </div>
            )}
          </div>

          {/* LOGOUT BUTTON (Beda Style) */}
          <div>
            <button 
              onClick={handleLogout}
              style={{
                ...buttonStyle,
                color: "#e60000", // Font merah mencolok
                border: "2px solid #ffebeb",
                background: "#fff5f5"
              }}
              className="hover:bg-red-100 hover:border-red-200"
            >
              <span style={{ fontWeight: "800" }}>🚪 Log Out</span>
              <span>→</span>
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}