"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

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

// SMALL IMAGE WRAPPER: uses next/image but falls back to <img> when there is an error
function ImageWrapper({ src, alt }: { src: string; alt: string }) {
  const [fail, setFail] = React.useState(false);
  const finalSrc = src || "/images/players/default.png";

  if (fail) {
    return (
      // final fallback
      <img
        src={finalSrc}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/players/default.png";
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

// static data (you can move to data/players.json later)
const PLAYERS: Player[] = [
  {
    id: "asnawi",
    name: "Asnawi",
    number: 10,
    position: "Penyerang",
    club: "Persija",
    age: 24,
    height: "178 cm",
    weight: "72 kg",
    photo: "/images/players/asnawi.jpg",
    bio:
      "Asnawi: penyerang lincah dengan dribel mematikan dan insting mencetak gol. Cepat di ruang sempit dan sering jadi penentu pertandingan.",
    stats: { appearances: 28, goals: 12, assists: 6, yellowCards: 3, redCards: 0 },
  },
  {
    id: "marc-klok",
    name: "Marc Klok",
    number: 4,
    position: "Gelandang",
    club: "Arema",
    age: 30,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/marc-klok.jpg",
    bio:
      "Marc Klok adalah  gelandang dengan visi permainan yang baik, kreator serangan dari lini tengah.",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "rizky-ridho",
    name: "Rizky Ridho",
    number: 4,
    position: "Gelandang",
    club: "Timnas Indonesia",
    age: 30,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/rizky-ridho.jpg",
    bio:
      "Rizky Ridho adalah gelandang dengan visi permainan yang baik, kreator serangan dari lini tengah.",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "marteen",
    name: "Marteen Paes",
    number: 1,
    position: "Kiper",
    club: "FC Dallas",
    age: 27,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Marteen-Paes.jpg",
    bio:
      "Marteen Paes adalah Kiper Timnas Indonesia yang berasal dari Amerika Serikat yang bermain juga di club FC Dallas.",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "ernando",
    name: "Ernando Ari",
    number: 12,
    position: "Kiper",
    club: "Persebaya Surabaya",
    age: 23,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Ernando-Ari.jpg",
    bio:
      "Ernando Ari adalah Kiper Timnas Indonesia yang berasal dari indonesia yang bermain juga di club Persebaya SurabayaSS.",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
    {
    id: "nadeo",
    name: "Nadeo Argawinata",
    number: 12,
    position: "Kiper",
    club: "Borneo Samarinda",
    age: 28,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Nadeo-Argawinata.jpg",
    bio:
      "Nadeo Argawinata adalah Kiper Timnas Indonesia yang berasal dari indonesia yang bermain juga di club Borneo Samarinda.",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "kevin",
    name: "Kevin Diks",
    number: 2,
    position: "Bek",
    club: "Mönchengladbach",
    age: 29,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Kevin-Diks.jpg",
    bio:
      "Kevin Diks adalah Bek Timnas Indonesia yang berasal dari Jerman yang bermain juga di club Mönchengladbach.",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "jay",
    name: "Jay Idzes",
    number: 3,
    position: "Bek",
    club: "Sassuolo",
    age: 25,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Jay-Idzez.jpg",
    bio:
      "Jay Idzes adalah Bek Timnas Indonesia yang berasal dari Italia yang bermain juga di club Sassuolo.",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "jordi",
    name: "Jordi Amat",
    number: 4,
    position: "Bek",
    club: "Persija Jakarta.",
    age: 33,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Jordi-Amat.jpg",
    bio:
      "Jordi Amat adalah Bek Timnas Indonesia yang berasal dari Indonesia yang bermain juga di club Persija Jakarta.",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "sandy",
    name: "Sandy Waish",
    number: 6,
    position: "Bek",
    club: "Buriram United",
    age: 30,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Sandy-Waish.jpg",
    bio:
      "Sandy Waish adalah Bek Timnas Indonesia yang berasal dari Thailand yang bermain juga di club Buriram United",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "calvin",
    name: "Calvin Verdonk",
    number: 17,
    position: "Bek",
    club: "Lille",
    age: 28,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Calvin-Verdonk.jpg",
    bio:
      "Calvin Verdonk adalah Bek Timnas Indonesia yang berasal dari Prancis yang bermain juga di club Lille",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "shayne",
    name: "Shayne Pattynama",
    number: 20,
    position: "Bek",
    club: "Buriram United",
    age: 27,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Shayne-Pattynama.jpg",
    bio:
      "Shayne Pattynama adalah Bek Timnas Indonesia yang berasal dari Thailand yang bermain juga di club Buriram United",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "dean",
    name: "Dean James",
    number: 21,
    position: "Bek",
    club: "Go Ahead Eagles",
    age: 25,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Dean-James.jpg",
    bio:
      "Dean James adalah Bek Timnas Indonesia yang berasal dari Belanda yang bermain juga di club Go Ahead Eagles",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "joey",
    name: "Joey Pelupessy",
    number: 14,
    position: "Gelandang",
    club: "Lommel SK",
    age: 32,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Joey-Pelupessy.jpg",
    bio:
      "Joey Pelupessy adalah Gelandang Timnas Indonesia yang berasal dari Belgia yang bermain juga di club Lommel SK",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "ricky",
    name: "Ricky Kambuaya",
    number: 15,
    position: "Gelandang",
    club: "Dewa United Banten",
    age: 29,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Ricky-Kambuaya.jpg",
    bio:
      "Ricky Kambuaya adalah Gelandang Timnas Indonesia yang berasal dari Indonesia yang bermain juga di club Dewa United Banten",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "Thom",
    name: "Thom Haye",
    number: 19,
    position: "Gelandang",
    club: "Persib Bandung",
    age: 30,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Thom-Haye.jpg",
    bio:
      "Thom Haye adalah Gelandang Timnas Indonesia yang berasal dari Indonesia yang bermain juga di club Persib Bandung",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "nathan",
    name: "Nathan Tjoe-A-On",
    number: 22,
    position: "Gelandang",
    club: "Willem II",
    age: 23,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Nathan-Tjoe-A-On.jpg",
    bio:
      "Nathan Tjoe-A-On adalah Gelandang Timnas Indonesia yang berasal dari Belanda yang bermain juga di club Willem II",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "eliano",
    name: "Eliano Reijnders",
    number: 23,
    position: "Gelandang",
    club: "Persib Bandung",
    age: 24,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Eliano-Reijnders.jpg",
    bio:
      "Eliano Reijnders adalah Gelandang Timnas Indonesia yang berasal dari Indonesia yang bermain juga di club Persib Bandung",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "stefano",
    name: "Stefano Lilipaly",
    number: 8,
    position: "Penyerang",
    club: "Dewa United Banten",
    age: 34,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Stefano-Lilipaly.jpg",
    bio:
      "Stefano Lilipaly adalah Gelandang Timnas Indonesia yang berasal dari Indonesia yang bermain juga di club Dewa United Banten",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "ramadhan",
    name: "Ramadhan Sananta",
    number: 7,
    position: "Penyerang",
    club: "Brunei DPMM",
    age: 22,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Ramadhan-Sananta.jpg",
    bio:
      "Ramadhan Sananta adalah Gelandang Timnas Indonesia yang berasal dari Brunei yang bermain juga di club Brunei DPMM",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "miliano",
    name: "Miliano Jonathans",
    number: 9,
    position: "Penyerang",
    club: "Dewa United Banten",
    age: 21,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Miliano-Jonathans.jpg",
    bio:
      "Miliano Jonathans adalah Gelandang Timnas Indonesia yang berasal dari Brunei yang bermain juga di club Dewa United Bante",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "ole",
    name: "Ole Romeny",
    number: 10,
    position: "Penyerang",
    club: "Oxford United",
    age: 25,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Ole-Romeny.jpg",
    bio:
      "Ole Romeny adalah Gelandang Timnas Indonesia yang berasal dari Inggris yang bermain juga di club Oxford United",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "ragnar",
    name: "Ragnar Oratmangoen",
    number: 11,
    position: "Penyerang",
    club: "Dender EH",
    age: 27,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Ragnar-Oratmangoen.jpg",
    bio:
      "Ragnar Oratmangoen adalah Gelandang Timnas Indonesia yang berasal dari Belgia yang bermain juga di club Dender EH",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
  {
    id: "mauro",
    name: "	Mauro Zijlstra",
    number: 13,
    position: "Penyerang",
    club: "Volendam",
    age: 20,
    height: "180 cm",
    weight: "75 kg",
    photo: "/images/players/Mauro-Zijlstra.jpg",
    bio:
      "	Mauro Zijlstra adalah Gelandang Timnas Indonesia yang berasal dari Belanda yang bermain juga di club Volendam",
    stats: { appearances: 30, goals: 5, assists: 10, yellowCards: 4, redCards: 0 },
  },
];

export default function PlayerDetailPage() {
  const router = useRouter();
  const params = useParams(); // <--- gunakan hook ini untuk client component
  const id = (params as any)?.id ?? null;

  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // ambil player dari array statis
    if (!id) {
      setPlayer(null);
      setLoading(false);
      return;
    }
    const p = PLAYERS.find((x) => String(x.id) === String(id)) ?? null;
    setPlayer(p);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <main style={{ padding: 32, fontFamily: "Inter, Arial, sans-serif" }}>
        <p>Memuat...</p>
      </main>
    );
  }

  if (!player) {
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
          <h1 style={{ margin: 0, fontSize: 22 }}>Pemain Tidak Ditemukan</h1>
          <p style={{ marginTop: 8 }}>ID: {id ?? "—"}</p>
          <div style={{ marginTop: 12 }}>
            <Link
              href="/player"
              style={{
                background: "#fff",
                color: "#e60000",
                padding: "8px 14px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Kembali ke Daftar Pemain
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const onFollow = () => setFollowed((v) => !v);

  const onSendMessage = () => {
    if (!message.trim()) {
      alert("Tulis pesan terlebih dahulu.");
      return;
    }
    alert(`Pesan terkirim ke ${player.name}:\n\n"${message}"`);
    setMessage("");
    setMessageOpen(false);
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
          <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "0.4px" }}>{player.name}</h1>
          <p style={{ marginTop: 6, opacity: 0.95 }}>
            #{player.number} • {player.position} • {player.club}
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
              <ImageWrapper src={player.photo ?? "/images/players/default.png"} alt={player.name} />
            </div>

            <div style={{ padding: 16 }}>
              <h2 style={{ margin: "6px 0", fontSize: 18 }}>{player.name}</h2>
              <p style={{ margin: "6px 0", color: "#555" }}>
                #{player.number} • {player.position}
              </p>

              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <h3 style={{ color: "#e60000", margin: 0 }}>Profil & Statistik</h3>
              <div style={{ textAlign: "right" }}>
                <Link href="/player" style={{ color: "#0066cc", textDecoration: "none", fontSize: 14 }}>
                  ← Kembali ke Daftar Pemain
                </Link>
                <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>ID: {player.id}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 20, marginTop: 18 }}>
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

              <div style={{ width: 220 }}>
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

            {messageOpen && (
              <div style={{ marginTop: 16 }}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Tulis pesan untuk ${player.name}...`}
                  style={{
                    width: "100%",
                    minHeight: 100,
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <button
                    onClick={onSendMessage}
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
                    Kirim Pesan
                  </button>
                  <button
                    onClick={() => {
                      setMessage("");
                      setMessageOpen(false);
                    }}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      background: "#fff",
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
