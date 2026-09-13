import NegoziClient from "./NegoziClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tutti i negozi e codici sconto",
  description: "Cerca e trova i migliori codici sconto e offerte dei tuoi negozi preferiti.",
};

export const revalidate = 60;

export default async function NegoziPage() {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
  const res = await fetch(`${backendUrl}/api/stores`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error('Failed to fetch stores');
  }
  
  const data = await res.json();
  const stores = data.stores || [];

  return <NegoziClient stores={stores} />;
}
