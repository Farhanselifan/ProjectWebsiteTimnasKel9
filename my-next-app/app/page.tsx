"use client";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

export type News = {
  id: number;
  title: string;
  description: string;
  date: string; // dari backend format "YYYY-MM-DD" atau string bebas
  news_images: string;
};

type Match = {
  id: number;
  home_team: string;
  away_team: string;
  match_date: string; // "2025-11-12"
  match_time: string; // "19:30:00"
  competition: string;
  stadium: string;
  home_images: string;
  away_images: string;
};

type Player = {
  id: number;
  name: string;
  position: string;
  image_url: string;
  dynamic_route: string;
};

export default function Home() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

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

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Garuda di Dadaku</h1>
          <p>Tim Nasional Sepak Bola Indonesia</p>
          <div className="hero-buttons">
            <a href="#jadwal">
              <button className="btn-primary">Lihat Jadwal</button>
            </a>
            <a href="/store">
              <button className="btn-secondary">Kunjungi Store</button>
            </a>
          </div>
        </div>
      </section>

      {/* Berita */}
      <section id="berita" className="content-page">
        <h1 className="section-title">Berita Terbaru</h1>

        {loading ? (
          <p>Sedang memuat berita...</p>
        ) : newsList.length === 0 ? (
          <p>Belum ada berita.</p>
        ) : (
          <ul className="news-list">
            {newsList.map((berita) => (
              <li key={berita.id}>
                <div className="news-card-horizontal">
                  <div className="news-image">
                    <Image
                      src={berita.news_images}
                      alt={berita.title}
                      width={400}
                      height={250}
                      className="img-cover"
                      priority
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
        )}

        {/* tombol + di kanan bawah section berita */}
        <div className="add-news-wrapper">
          <Link
            href="/addnews"
            className="add-news-btn"
            aria-label="Tambahkan berita baru"
          >
            +
          </Link>
        </div>
      </section>

      {/* Jadwal */}
      <section id="jadwal" className="content-page">
        <h1>Jadwal Pertandingan Timnas Indonesia</h1>
        {matches.length === 0 ? (
          <p>Belum ada jadwal pertandingan.</p>
        ) : (
          <ul>
            {matches.map((jwl) => (
              <li key={jwl.id}>
                <div className="schedule-card">
                  <div className="match-date">{jwl.match_date}</div>
                  <div className="match-info">
                    <div className="team">
                      <Image
                        src={jwl.home_images}
                        alt={jwl.home_team}
                        width={32}
                        height={32}
                        className="flag"
                      />
                      <span className="team-home">{jwl.home_team}</span>
                    </div>
                    <span className="vs">vs</span>
                    <div className="team">
                      <Image
                        src={jwl.away_images}
                        alt={jwl.away_team}
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
            ))}
          </ul>
        )}
      </section>

      {/* Pemain */}
      <section id="pemain" className="content-page">
        <h1>Daftar Pemain Timnas Indonesia</h1>

        {loading ? (
          <p>sedang memuat pemain...</p>
        ) : players.length === 0 ? (
          <p>Belum ada pemain</p>
        ) : (
          <ul className="player-grid">
            {players.map((pemain) => (
              <li key={pemain.id}>
                <div className="player-card">
                  <a href={pemain.dynamic_route}>
                    <div className="player-card">
                      <img
                        src={pemain.image_url}
                        alt={pemain.name}
                        className="player-img"
                        width={30}
                        height={30}
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
