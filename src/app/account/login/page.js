"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AUTH_TOKEN_STORAGE_KEY } from "@/config/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
      if (token) {
        router.replace("/dashboard");
      }
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Credenziali non valide.");
        setLoading(false);
        return;
      }

      if (data.token) {
        window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, data.token);
        if (data.user) {
          window.localStorage.setItem("codicesconto_user", JSON.stringify(data.user));
        }
        router.push("/dashboard");
      } else {
        setError("Risposta del server non valida.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login request error:", err);
      setError("Si è verificato un errore durante l'accesso. Riprova più tardi.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-primary-dark w-full py-4">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <h1 className="text-white text-2xl font-light">Accedi al tuo account</h1>
        </div>
      </div>

      <main className="flex-grow w-full py-10">
        <div className="max-w-[460px] mx-auto px-4">
          <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Bentornato su CodiceSconto</h2>
              <p className="text-gray-500 text-xs">
                Accedi per gestire le tue preferenze e scoprire promozioni riservate.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded p-3 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@esempio.it"
                  className="w-full border border-gray-300 rounded-sm py-2 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-sm py-2 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold text-[13px] uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? "Accesso in corso..." : "Accedi"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <Link href="/" className="text-xs text-gray-500 hover:text-accent transition-colors">
                ← Torna alla Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
