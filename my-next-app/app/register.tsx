// pages/register.tsx
import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Register(): JSX.Element {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registrasi gagal");

      alert("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Daftar Akun - Profil Timnas Indonesia</title>
      </Head>

      <div style={styles.body}>
        {/* Bagian kiri */}
        <div style={styles.left}>
          <div style={styles.logoArea}>
            <div style={styles.logoText}>
              <h1>Timnas Indonesia</h1>
              <p>Merah Putih di Hati, Garuda di Dada</p>
            </div>
          </div>
          <img
            src="/images/garuda-logo.png"
            alt="Ilustrasi Pemain"
            style={styles.illustration}
          />
          <a href="/" style={styles.backBtn}>
            Kembali ke Beranda
          </a>
        </div>

        {/* Bagian kanan */}
        <div style={styles.right}>
          <div style={styles.overlay}></div>
          <div style={styles.loginBox}>
            <h2 style={styles.title}>Buat Akun Timnas</h2>

            <button style={styles.socialBtn} type="button">
              <span style={{ color: "#555" }}>G</span>
              <span>Daftar dengan Google</span>
            </button>

            <hr style={{ marginBottom: "1.5rem" }} />

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" style={styles.label}>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Masukkan Nama"
                  required
                  style={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="email" style={styles.label}>
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Masukkan Email"
                  required
                  style={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Masukkan Password"
                  required
                  style={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" style={styles.loginBtn} disabled={loading}>
                {loading ? "Memproses..." : "Daftar"}
              </button>
            </form>

            {error && (
              <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
                {error}
              </p>
            )}

            <div style={styles.signupText}>
              <p>
                Sudah punya akun?{" "}
                <a href="/login" style={styles.signupLink}>
                  Masuk di sini
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ==== STYLE (sama seperti login.tsx agar konsisten) ==== */
const styles: Record<string, React.CSSProperties> = {
  body: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: "Poppins, sans-serif",
  },
  left: {
    width: "50%",
    background: "linear-gradient(180deg, #d00000 0%, #a50000 100%)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "2rem",
  },
  logoArea: {
    position: "absolute",
    top: "2rem",
    left: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  logoText: {
    textAlign: "left",
  },
  illustration: {
    width: "70%",
    maxWidth: "350px",
    marginTop: "4rem",
    filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3))",
  },
  backBtn: {
    marginTop: "2rem",
    padding: "0.6rem 1.8rem",
    backgroundColor: "white",
    color: "#a50000",
    fontWeight: 600,
    textDecoration: "none",
    borderRadius: "8px",
    transition: "all 0.3s",
  },
  right: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('/images/stadion.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  loginBox: {
    position: "relative",
    zIndex: 1,
    backgroundColor: "white",
    width: "100%",
    maxWidth: "400px",
    padding: "2.5rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.7rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#a50000",
  },
  socialBtn: {
    width: "100%",
    padding: "0.6rem",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    backgroundColor: "white",
    fontWeight: 500,
    cursor: "pointer",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    transition: "background 0.3s",
  },
  label: {
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "0.9rem",
    marginTop: "0.3rem",
  },
  loginBtn: {
    backgroundColor: "#d00000",
    border: "none",
    borderRadius: "6px",
    padding: "0.7rem",
    fontWeight: 700,
    color: "white",
    cursor: "pointer",
    transition: "background 0.3s",
    width: "100%",
    marginTop: "1rem",
  },
  signupText: {
    textAlign: "center",
    marginTop: "1.5rem",
    fontSize: "0.9rem",
  },
  signupLink: {
    fontWeight: 700,
    color: "#d00000",
    textDecoration: "none",
  },
};
