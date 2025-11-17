"use client";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";



type News = {
  id: number;
  title: string;
  description: string;
  date: string; // dari backend format "YYYY-MM-DD"
};

type Match = {
  id: number;
  home_team: string;
  away_team: string;
  match_date: string; // "2025-11-12"
  match_time: string; // "19:30:00"
  competition: string;
  stadium: string;
};

type Player = {
  id: number;
  name: string;
  position: string;
};

export default function Home() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  // ambil data berita dari backend Express
  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/news");
      const data = await res.json();
      setNewsList(data);
    } catch (err) {
      console.error("Error fetch news:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    const res = await fetch("http://localhost:5000/matches");
    const data = await res.json();
    setMatches(data);
  };

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/players");
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      console.error("Error fetching players:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchMatches();
    fetchPlayers();
  }, []);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date) {
      alert("Isi semua field dulu");
      return;
    }

    try {
      await fetch("http://localhost:5000/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, date }),
      });

      // reset form
      setTitle("");
      setDescription("");
      setDate("");

      // refresh berita
      fetchNews();
    } catch (err) {
      console.error("Error add news:", err);
    }
  };
    const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    // ambil jam-menit dari "HH:MM:SS"
    return timeStr.slice(0, 5) + " WIB";
  };

  

  
  return (
    <main>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Garuda di Dadaku</h1>
          <p>Tim Nasional Sepak Bola Indonesia</p>
          <div className="hero-buttons">
            <a href="#jadwal"><button className="btn-primary">Lihat Jadwal</button></a>
            <a href="/store"><button className="btn-secondary">Kunjungi Store</button></a>
          </div>
        </div>
      </section>

  
      <section id="berita" className="content-page">
      <h1 className="section-title">Berita Terbaru</h1>

      {loading ? (
            <p>Sedang memuat berita...</p>
          ) : newsList.length === 0 ? (
            <p>Belum ada berita.</p>
          ) :(
            <ul className="news-list">
              {newsList.map((berita)=>(
                <li
                  key={berita.id}
                >
                  <div className="news-card-horizontal">
                      <div className="news-image">
                            <Image
                              src="/images/news/indonesia.jpg"
                              alt="Indonesia menang 4-0 atas Thailand"
                              width={400}
                              height={250}
                              className="img-cover"
                              priority // optional: load faster jika di atas fold
                            />
                          </div>
                        <div className="news-content">
                        <h3>{berita.title}</h3>
                        <p>{berita.description}</p>
                        <time className="news-date">{berita.date}</time>
                      </div>
                  </div>
                
                </li>
              ))}
              
            </ul>
          )
        }
        </section>


          {/* === Jadwal Section dengan Bendera === */}
          <section id="jadwal" className="content-page">
            <h1>Jadwal Pertandingan Timnas Indonesia</h1>
                {matches.length === 0 ? (
                <p>Belum ada jadwal pertandingan.</p>
                ) : (
                  <ul>
                    {matches.map((jwl)=>
                    <li
                      key={jwl.id}
                    >
                      <div className="schedule-card">
                        <div className="match-date">{jwl.match_date}</div>
                        <div className="match-info">
                          <div className="team">
                            <Image
                              src="/images/flags/indonesia.png"
                              alt="Indonesia"
                              width={32}
                              height={32}
                              className="flag"
                            />
                            <span className="team-home">{jwl.home_team}</span>
                          </div>
                          <span className="vs">vs</span>
                          <div className="team">
                            <Image
                              src="/images/flags/australia.svg"
                              alt="Australia"
                              width={32}
                              height={32}
                              className="flag"
                            />
                            <span className="team-away">{jwl.away_team}</span>
                          </div>
                        </div>
                        <div className="match-details">
                          <p>{jwl.competition}</p>
                          <p className="time">{jwl.match_time}</p>
                        </div>
                      </div>

                    </li>
                    )}
                  </ul>

                )}
            </section>


            
            {/* === Pemain Section === */}
            <section id="pemain" className="content-page">
              <h1>Daftar Pemain Timnas Indonesia</h1>
            
              {loading ?(
                  <p> sedang memuat pemain</p>
              ): players.length === 0 ? (
                  <p> Belum ada pemain</p>
                ) : (
                  <ul>
                    {players.map((pemain)=>(
                      <li  className="player-grid"
                        key={pemain.id}
                      >
                        <div >
                          <a href="/player/asnawi">
                            <div className="player-card">
                                <img
                                  src="/images/players/asnawi.jpg"
                                  alt="Asnawi Mangkualam"
                                  className="player-img"
                                  width={300}      // any number, will be scaled
                                  height={300}
                                />
                                <h3>{pemain.name}</h3>
                                <p>{pemain.position}</p>
                            </div>
                           </a>
                        </div>
                      </li>
                    ))}
                  </ul>

              )}
      </section>
    </main>
  );
}