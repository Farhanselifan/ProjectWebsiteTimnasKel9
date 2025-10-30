import "./globals.css";

export const metadata = {
  title: "Timnas Indonesia",
  description: "Website Tim Nasional Sepak Bola Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <nav className="navbar">
          <div className="navbar-logo">Timnas Indonesia</div>
          <ul className="navbar-menu">
            <li><a href="#berita">Berita</a></li>
            <li><a href="#pemain">Pemain</a></li>
            <li><a href="#jadwal">Jadwal</a></li>
<<<<<<< HEAD
            <li><a href="/store">Store</a></li>
            <li><a href="/login">Login</a></li>
=======
            <li>
                <a href="/store" className="btn-secondary">
                  Store
                </a>
            </li>
            <li><a href="#">Login</a></li>
>>>>>>> 43118015235a96a8f44893fe58177c8ad142f07e
          </ul>
        </nav>

        {children}
      </body>
    </html>
  );
}
