import Image from "next/image";
import React from "react"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Garuda di Dadaku</h1>
          <p>Tim Nasional Sepak Bola Indonesia</p>
          <div className="hero-buttons">
            <a href="#jadwal"><button className="btn-primary">Lihat Jadwal</button></a>
            <a href="#store"><button className="btn-secondary">Kunjungi Store</button></a>
          </div>
        </div>
      </section>

      <section id="berita" className="content-page">
  <h1 className="section-title">Berita Terbaru</h1>
  
  <div className="news-list">
    {/* Berita 1 */}
    <article className="news-card-horizontal">
-      <div className="news-image">
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
        <h3>Indonesia Menang Telak 4-0 atas Thailand</h3>
        <p>
          Timnas Indonesia tampil gemilang di laga persahabatan melawan Thailand, 
          mencatat kemenangan meyakinkan 4-0 di Stadion Utama Gelora Bung Karno. 
          Gol dicetak oleh Ragnar Oratmangoen (2x), Marselino Ferdinan, dan Witan Sulaeman.
        </p>
        <time className="news-date">29 Oktober 2025</time>
      </div>
    </article>

    {/* Berita 2 */}
    <article className="news-card-horizontal">
      <div className="news-image">
        <Image
          src="/images/news/shin-tae-yong.jpg"
          alt="Shin Tae-yong umumkan daftar pemain Piala Asia 2025"
          width={400}
          height={250}
          className="img-cover"
        />
      </div>
      <div className="news-content">
        <h3>Shin Tae-yong Umumkan Daftar Pemain Piala Asia</h3>
        <p>
          Pelatih kepala Timnas Indonesia, Shin Tae-yong, resmi mengumumkan 26 nama pemain 
          yang akan berlaga di Piala Asia 2025. Nama-nama seperti Egy Maulana Vikri, 
          Asnawi Mangkualam, dan Stefano Lilipaly masuk dalam daftar.
        </p>
        <time className="news-date">28 Oktober 2025</time>
      </div>
    </article>
  </div>
</section>  



    {/* === Jadwal Section dengan Bendera === */}
    <section id="jadwal" className="content-page">
      <h1>Jadwal Pertandingan Timnas Indonesia</h1>
      <div className="schedule-list">
        {/* Pertandingan 1 */}
        <div className="schedule-card">
          <div className="match-date">12 November 2025</div>
          <div className="match-info">
            <div className="team">
              <Image
                src="/images/flags/indonesia.png"
                alt="Indonesia"
                width={32}
                height={32}
                className="flag"
              />
              <span className="team-home">Indonesia</span>
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
              <span className="team-away">Australia</span>
            </div>
          </div>
          <div className="match-details">
            <p>Kualifikasi Piala Dunia 2026 • Stadion Utama Gelora Bung Karno</p>
            <p className="time">19:30 WIB</p>
          </div>
        </div>

        {/* Pertandingan 2 */}
        <div className="schedule-card">
          <div className="match-date">17 November 2025</div>
          <div className="match-info">
            <div className="team">
              <Image
                src="/images/flags/bahrain.svg"
                alt="Bahrain"
                width={32}
                height={32}
                className="flag"
              />
              <span className="team-home">Bahrain</span>
            </div>
            <span className="vs">vs</span>
            <div className="team">
              <Image
                src="/images/flags/indonesia.png"
                alt="Indonesia"
                width={32}
                height={32}
                className="flag"
              />
              <span className="team-away">Indonesia</span>
            </div>
          </div>
          <div className="match-details">
            <p>Kualifikasi Piala Dunia 2026 • Bahrain National Stadium</p>
            <p className="time">22:00 WIB</p>
          </div>
        </div>

        {/* Pertandingan 3 */}
        <div className="schedule-card">
          <div className="match-date">10 Januari 2026</div>
          <div className="match-info">
            <div className="team">
              <Image
                src="/images/flags/indonesia.png"
                alt="Indonesia"
                width={32}
                height={32}
                className="flag"
              />
              <span className="team-home">Indonesia</span>
            </div>
            <span className="vs">vs</span>
            <div className="team">
              <Image
                src="/images/flags/japan.png"
                alt="Jepang"
                width={32}
                height={32}
                className="flag"
              />
              <span className="team-away">Jepang</span>
            </div>
          </div>
          <div className="match-details">
            <p>Piala Asia 2025 • Grup A</p>
            <p className="time">18:00 WIB</p>
          </div>
        </div>
      </div>
    </section>

      {/* === Pemain Section === */}
      <section id="pemain" className="content-page">
        <h1>Daftar Pemain Timnas Indonesia</h1>
        <div className="player-grid">
          {/* Player 1 */}
          <div className="player-card">
            <img
              src="/images/players/asnawi.jpg"
              alt="Asnawi Mangkualam"
              className="player-img"
              width={300}      // any number, will be scaled
              height={300}
            />
            <h3>Asnawi Mangkualam</h3>
            <p>Bek Kanan</p>
          </div>

          {/* Player 2 */}
          <div className="player-card">
            <img
              src="/images/players/marc-klok.jpg"
              alt="Marc Klok"
              className="player-img"
              width={300}      // any number, will be scaled
              height={300}
            />
            <h3>Marc Klok</h3>
            <p>Gelandang</p>
          </div>

          {/* Player 3 */}
          <div className="player-card">
            <img
              src="/images/players/rizky-ridho.jpg"
              alt="Rizky Ridho"
              className="player-img"
              width={300}      // any number, will be scaled
              height={300}
            />
            <h3>Rizky Ridho</h3>
            <p>Bek Tengah</p>
          </div>
          {/* Add more players the same way */}
        </div>
</section>
    </main>
  );
}