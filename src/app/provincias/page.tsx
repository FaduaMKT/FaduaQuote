"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, MapPin, Plus } from "lucide-react";
import Link from "next/link";

export default function ProvinciasPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Client-side protection backup
    const tokenCookie = document.cookie.includes("auth_token=");
    const tokenLocal = localStorage.getItem("auth_token");
    if (!tokenCookie && !tokenLocal) {
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("auth_token");
    router.replace("/login");
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#eaeaea] flex items-center justify-center text-fiatDark font-bold">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeaea] text-fiatDark">
      {/* Top Bar */}
      <header className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-[20px] font-black text-fiatDark leading-none m-0">
          Fadua<span className="text-fiatRed">Quote</span>
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[12px] font-bold text-[#666] hover:text-fiatRed transition-colors"
        >
          SALIR <LogOut size={16} />
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-[32px] font-black mb-3">Seleccione una Provincia</h2>
          <p className="text-[#666] text-[15px] font-semibold">
            Elija la sucursal para gestionar los asesores y presupuestos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {/* Card SALTA */}
          <Link
            href="/vendedores?provincia=salta"
            className="group bg-white rounded-[16px] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(212,0,0,0.15)] hover:-translate-y-1 hover:border-fiatRed border border-transparent transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-[#f8f8f8] group-hover:bg-[#fff0f0] group-hover:text-fiatRed text-fiatDark flex items-center justify-center transition-colors duration-300">
              <MapPin size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-[24px] font-black group-hover:text-fiatRed transition-colors duration-300">SALTA</h3>
          </Link>

          {/* Card JUJUY */}
          <Link
            href="/vendedores?provincia=jujuy"
            className="group bg-white rounded-[16px] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(212,0,0,0.15)] hover:-translate-y-1 hover:border-fiatRed border border-transparent transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-[#f8f8f8] group-hover:bg-[#fff0f0] group-hover:text-fiatRed text-fiatDark flex items-center justify-center transition-colors duration-300">
              <MapPin size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-[24px] font-black group-hover:text-fiatRed transition-colors duration-300">JUJUY</h3>
          </Link>

          {/* Card NUEVA PROVINCIA */}
          <div className="bg-[#f2f2f2] rounded-[16px] p-8 border border-[#ddd] flex flex-col items-center justify-center gap-4 opacity-60 cursor-not-allowed">
            <div className="w-16 h-16 rounded-full bg-[#e5e5e5] text-[#999] flex items-center justify-center">
              <Plus size={32} strokeWidth={3} />
            </div>
            <h3 className="text-[16px] font-bold text-[#999] text-center w-full leading-tight">
              + NUEVA<br />PROVINCIA
            </h3>
          </div>
        </div>
      </main>
    </div>
  );
}
