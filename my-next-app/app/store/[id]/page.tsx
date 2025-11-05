import ProductClient from "./ProductClient";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  // You can still fetch product data here if needed
  return <ProductClient id={params.id} />;
}
