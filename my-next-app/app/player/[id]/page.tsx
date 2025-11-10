import Image from "next/image";
import Link from "next/link";

type Player = {
  id: string;
  name: string;
  number: number;
  position: string;
  club: string;
  age?: number;
  height?: string;
  weight?: string;
  photo?: string;
  bio?: string;
  stats?: {
    appearances?: number;
    goals?: number;
    assists?: number;
    yellowCards?: number;
    redCards?: number;
  };
};

type Props = {
  params: { id: string };
};

const players: Player[] = [
  {
    id: "asnawi",
    name: "asnawi",
    number: 10,
    position: "Penyerang",
    club: "Persija",
    age: 24,
    height: "178 cm",
    weight: "72 kg",
    photo: "../images/players/asnawi.jpg",
    bio: "Asnawi adalah penyerang cepat dengan dribel bagus dan insting mencetak gol. Lahir di Jakarta, dilatih sejak usia dini, dan tampil konsisten di kompetisi domestik.",
    stats: { appearances: 28, goals: 12, assists: 6, yellowCards: 3, redCards: 0 },
  },
  {
    id: "Calvin",
    name: "Calvin Verdonk",
    number: 4,
    position: "Bek Tengah",
    club: "Arema",
    age: 27,
    height: "185 cm",
    weight: "78 kg",
    photo: "../images/players/Calvin VerdonkS.jpg",
    bio: "Calvin Verdonk adalah bek tangguh yang kuat secara fisik dan membaca permainan dengan baik. Pemain andalan tim pertahanan.",
    stats: { appearances: 30, goals: 2, assists: 1, yellowCards: 5, redCards: 0 },
  },
];

export default function PlayerDetailPage({ params }: Props) {
  const id = params?.id;
  const player = players.find((p) => String(p.id) === String(id));

  if (!player) {
    return (
      <main style={{ padding: 48, fontFamily: "Arial, sans-serif" }}>
        <section
          style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "linear-gradient(135deg, #e60000, #ff9900)",
            color: "white",
            borderRadius: 8,
          }}
        >
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Pemain Tidak Ditemukan</h1>
          <p style={{ marginBottom: 12 }}>ID: {id}</p>
          <Link
            href="/players"
            style={{
              display: "inline-block",
              marginTop: "10px",
              background: "white",
              color: "#e60000",
              padding: "8px 14px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Kembali ke Daftar Pemain
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="player-page" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Hero */}
      <section
        className="player-hero"
        style={{
          textAlign: "center",
          height: "200px",
          padding: "40px 20px",
          background: "linear-gradient(135deg, #e60000, #ff9900)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: 30, marginBottom: 8 }}>{player.name}</h1>
        <p style={{ fontSize: 14 }}>
          #{player.number} • {player.position} • {player.club}
        </p>
      </section>

      {/* Detail area (mirip concept store detail) */}
      <section style={{ padding: "40px 20px" }}>
        <div
          style={{
            maxWidth: 980,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "360px 1fr",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Left - photo card */}
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              background: "#fff",
              textAlign: "center",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: 360 }}>
              <Image
                src={player.photo ?? "/images/players/default.png"}
                alt={player.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 360px"
              />
            </div>

            <div style={{ padding: "18px" }}>
              <h2 style={{ margin: "6px 0", fontSize: 20 }}>{player.name}</h2>
              <p style={{ margin: "6px 0", color: "#666" }}>
                #{player.number} • {player.position}
              </p>

              <div style={{ marginTop: 12 }}>
                <button
                  style={{
                    width: "100%",
                    background: "#e60000",
                    color: "#fff",
                    padding: "10px 14px",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                  onClick={() => alert("Fitur follow belum diimplementasikan.")}
                >
                  Ikuti Pemain
                </button>
              </div>
            </div>
          </div>

          {/* Right - details */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ color: "#e60000", marginTop: 0, marginBottom: 12 }}>
              Deskripsi Pemain
            </h3>

            <div style={{ display: "flex", gap: 24 }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "8px 0", fontWeight: 700 }}>Nama</p>
                <p style={{ margin: "6px 0 12px" }}>{player.name}</p>

                <p style={{ margin: "8px 0", fontWeight: 700 }}>Klub</p>
                <p style={{ margin: "6px 0 12px" }}>{player.club}</p>

                <p style={{ margin: "8px 0", fontWeight: 700 }}>Umur / Tinggi / Berat</p>
                <p style={{ margin: "6px 0 12px" }}>
                  {player.age ?? "—"} tahun • {player.height ?? "—"} • {player.weight ?? "—"}
                </p>
              </div>

              <div style={{ width: 200 }}>
                <p style={{ margin: "8px 0", fontWeight: 700 }}>Statistik</p>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
                  <li style={{ marginBottom: 8 }}>
                    <strong>Penampilan:</strong> {player.stats?.appearances ?? 0}
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    <strong>Gol:</strong> {player.stats?.goals ?? 0}
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    <strong>Assist:</strong> {player.stats?.assists ?? 0}
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    <strong>Kuning:</strong> {player.stats?.yellowCards ?? 0}
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    <strong>Merah:</strong> {player.stats?.redCards ?? 0}
                  </li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <p style={{ margin: 0, fontWeight: 700 }}>Biografi</p>
              <p style={{ marginTop: 8, lineHeight: 1.6 }}>{player.bio}</p>
            </div>

            <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
              <Link
                href="/players"
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  textDecoration: "none",
                  color: "#333",
                }}
              >
                ← Kembali ke Daftar Pemain
              </Link>

              <button
                onClick={() => alert("Fitur kirim pesan ke pemain belum diimplementasikan.")}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: "#e60000",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Kirim Pesan / Follow
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
