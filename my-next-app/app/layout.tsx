import "./globals.css";
import React from "react"

export const metadata = {
  title: "Timnas Indonesia",
  description: "Website Tim Nasional Sepak Bola Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <nav className="navbar">
          <div className="navbar-logo" >Timnas Indonesia</div>
          <ul className="navbar-menu">
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li>
                <a href="/store" className="btn-secondary">
                  Store
                </a>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
