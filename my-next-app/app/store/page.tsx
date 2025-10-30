// app/store/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function StorePage() {
  const products = [
    {
      id: 1,
      name: "Jersey Home Timnas Indonesia 2025",
      price: "Rp 750.000",
      image: "/images/store/jersey-home.jpg",
      badge: "Official",
    },
    {
      id: 2,
      name: "Jersey Away Garuda Putih",
      price: "Rp 720.000",
      image: "/images/store/jersey-away.jpg",
      badge: "Limited",
    }
  
  ];

  return (
    <main className="store-page">
      {/* Hero Section */}
      <section className="store-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Official Store Timnas Indonesia</h1>
          <p>Dukung Garuda dengan merchandise resmi berkualitas tinggi!</p>
          <Link href="#products" className="btn-shop-now">
            Belanja Sekarang
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="products-section">
        <div className="container">
          <h2 className="section-title">Produk Tersedia</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {product.badge && (
                  <span className={`badge badge-${product.badge.toLowerCase()}`}>
                    {product.badge}
                  </span>
                )}
                <div className="product-image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="img-fluid"
                  />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">{product.price}</p>
                  <button className="btn-buy">Beli Sekarang</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="back-link">
        <Link href="/">← Kembali ke Beranda</Link>
      </section>
    </main>
  );
}