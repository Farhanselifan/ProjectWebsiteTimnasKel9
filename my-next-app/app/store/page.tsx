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
    },
    {
      id: 3,
      name: "Training Kit Timnas 2025",
      price: "Rp 650.000",
      image: "/images/store/trainingkit.jpg",
      badge: "New",
    },
  ];

  return (
    <main className="store-page" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Hero Section */}
      <section
        className="store-hero"
        style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "linear-gradient(135deg, #e60000, #ff9900)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
          Official Store Timnas Indonesia
        </h1>
        <p style={{ fontSize: "18px" }}>
          Dukung Garuda dengan merchandise resmi berkualitas tinggi!
        </p>
        <Link
          href="#products"
          style={{
            display: "inline-block",
            marginTop: "20px",
            background: "white",
            color: "#e60000",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Belanja Sekarang
        </Link>
      </section>

      {/* Products Grid */}
      <section id="products" className="products-section" style={{ padding: "50px 20px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "40px",
          }}
        >
          Produk Tersedia
        </h2>

        <div
          className="products-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/store/${product.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
            >
              <div
                className="product-card"
                style={{
                  background: "white",
                  textAlign: "center",
                }}
              >
                {product.badge && (
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      background:
                        product.badge === "Official"
                          ? "#e60000"
                          : product.badge === "Limited"
                          ? "#ff6600"
                          : "#009933",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  >
                    {product.badge}
                  </span>
                )}
                <div className="product-image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="product-info" style={{ padding: "15px" }}>
                  <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                    {product.name}
                  </h3>
                  <p
                    className="price"
                    style={{ color: "#e60000", fontWeight: "bold" }}
                  >
                    {product.price}
                  </p>
                  <p
                    style={{
                      color: "#0066cc",
                      marginTop: "10px",
                      fontSize: "14px",
                    }}
                  >
                    Klik untuk melihat detail →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Back to Home */}
      <section
        className="back-link"
        style={{ textAlign: "center", paddingBottom: "40px" }}
      >
        <Link href="/" style={{ color: "#0066cc", textDecoration: "none" }}>
          ← Kembali ke Beranda
        </Link>
      </section>
    </main>
  );
}
