import NegoziClient from "./NegoziClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tutti i negozi e codici sconto | CodiceSconto",
  description: "Cerca e trova i migliori codici sconto e offerte dei tuoi negozi preferiti.",
};

export const revalidate = 60;

export default async function NegoziPage() {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";
  let stores = [];
  try {
    const res = await fetch(`${backendUrl}/api/stores?active=true`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      stores = (data.stores || []).filter((s) => s.isActive !== false);
    }
  } catch (err) {
    console.error("Failed to fetch stores:", err);
  }

  return <NegoziClient stores={stores} />;
}
