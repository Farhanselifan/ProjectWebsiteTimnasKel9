export type StoreProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: "Official" | "Limited" | "New";
  heroHeadline: string;
  description: string;
  highlights: string[];
  shippingInfo: string;
  sizes: string[];
  stockStatus: string;
};

export const products: StoreProduct[] = [
  {
    id: "1",
    name: "Jersey Home Timnas Indonesia 2025",
    price: "Rp 750.000",
    image: "/images/store/jersey-home.jpg",
    badge: "Official",
    heroHeadline: "Kebanggaan Merah Putih Edisi 2025",
    description:
      "Jersey home resmi Timnas Indonesia dengan motif batik Garuda dan teknologi penyerapan keringat terbaru.",
    highlights: [
      "Material AeroReady ringan dan cepat kering",
      "Detail embroidery lambang Garuda dan logo PSSI",
      "Lis hijau pada kerah terinspirasi warna lapangan",
    ],
    shippingInfo: "Pengiriman 2-4 hari kerja ke seluruh Indonesia.",
    sizes: ["S", "M", "L", "XL"],
    stockStatus: "Ready Stock",
  },
  {
    id: "2",
    name: "Jersey Away Garuda Putih",
    price: "Rp 720.000",
    image: "/images/store/jersey-away.jpg",
    badge: "Limited",
    heroHeadline: "Edisi Garuda Putih Untuk Laga Tandang",
    description:
      "Jersey away bernuansa putih bersih dengan aksen merah metalik yang memberikan kesan modern dan premium.",
    highlights: [
      "Panel mesh di sisi kiri-kanan menjaga sirkulasi udara",
      "Logo Garuda monokrom timbul",
      "Patch kualifikasi besar di lengan kiri",
    ],
    shippingInfo: "Pengiriman 3-5 hari kerja, bonus stiker Garuda.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stockStatus: "Limited Stock",
  },
  {
    id: "3",
    name: "Bundle Kit Timnas 2025",
    price: "Rp 650.000",
    image: "/images/store/timnasbundle.jpg",
    badge: "New",
    heroHeadline: "Paket Lengkap Dukung Garuda",
    description:
      "Bundle merchandise berisi scarf, tumbler stainless, dan mini flag eksklusif edisi terbatas.",
    highlights: [
      "Scarf rajut reversible dengan tulisan 'Garuda Pasti Bisa'",
      "Tumbler 600ml insulasi panas/dingin 12 jam",
      "Mini flag satin + tiang akrilik",
    ],
    shippingInfo: "Pengiriman 1-3 hari kerja dengan kotak kolektor.",
    sizes: ["All Size"],
    stockStatus: "Pre-Order",
  },
];

export const findProductById = (id: string) =>
  products.find((product) => product.id === id);
