import NegoziClient from "./NegoziClient";
import { stores as fallbackStores } from "@/data/stores/storesData";

export const metadata = {
  title: "Tutti i negozi e codici sconto | CodiceSconto",
  description: "Cerca e trova i migliori codici sconto e offerte dei tuoi negozi preferiti.",
};

export const revalidate = 60;

export default async function NegoziPage() {
  const backendUrl = process.env.BACKEND_URL || "https://coupons-site-backend.vercel.app";
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

  // If backend returns few/no stores or is offline, supplement with full directory fallback stores
  // so that all alphabet sections (#, A-Z) are fully populated in static export.
  const finalStores = stores.length > 20 ? stores : [...stores, ...fallbackStores];

  return <NegoziClient stores={finalStores} />;
}
