"use client";

import React, { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import Presupuesto from "@/components/Presupuesto";
import defaultModelos from "@/data/modelos.json";
import { supabase } from "@/lib/supabase";

function PresupuestoViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeloId = searchParams.get("modeloId") || "";
  const vendedorId = searchParams.get("vendedorId") || "";

  const [isClient, setIsClient] = useState(false);
  const [modeloNombre, setModeloNombre] = useState<string>("Cargando...");
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Presupuesto_${modeloNombre.replace(/ /g, "_")}`,
  });

  useEffect(() => {
    setIsClient(true);
    
    // Auth check
    const tokenCookie = document.cookie.includes("auth_token=");
    const tokenLocal = localStorage.getItem("auth_token");
    if (!tokenCookie && !tokenLocal) {
      router.replace("/login");
      return;
    }

    // Load Model to get the name for the title
    const loadModel = async () => {
      const { data, error } = await supabase.from("modelos").select("titulo, subtitulo").eq("id", modeloId).single();
      if (!error && data) {
        setModeloNombre(`${data.titulo} ${data.subtitulo}`);
      } else {
        const storedModelos = localStorage.getItem("fadua_modelos");
        let modelos = defaultModelos.modelos;
        if (storedModelos) {
          try {
            modelos = JSON.parse(storedModelos);
          } catch (e) {}
        }
        const found = modelos.find((m: any) => m.id === modeloId);
        if (found) {
          setModeloNombre(`${found.titulo} ${found.subtitulo}`);
        } else {
          setModeloNombre("Presupuesto Desconocido");
        }
      }
    };
    loadModel();
  }, [router, modeloId]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#eaeaea] flex items-center justify-center text-fiatDark font-bold">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeaea] text-fiatDark font-sans pb-12 print:bg-white print:pb-0">
      {/* Top Bar - Hidden on Print */}
      <header className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] px-6 py-4 flex justify-between items-center sticky top-0 z-10 print:hidden">
        <div className="flex items-center gap-4">
          <Link
            href={`/presupuestos?vendedorId=${vendedorId}`}
            className="shrink-0 w-10 h-10 rounded-full bg-[#f4f4f4] hover:bg-[#e0e0e0] flex items-center justify-center text-fiatDark transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-[18px] font-black text-fiatDark m-0 truncate leading-none pt-1">
            {modeloNombre}
          </h1>
        </div>
        <button
          onClick={() => handlePrint()}
          className="bg-fiatRed hover:bg-[#b30000] text-white text-[14px] font-bold py-2.5 px-5 rounded-[8px] transition-colors flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(212,0,0,0.2)]"
        >
          <Printer size={18} />
          <span className="hidden sm:inline">IMPRIMIR PDF</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1200px] mx-auto pt-8 px-4 print:pt-0 print:px-0 print:max-w-none">
        <div ref={contentRef} className="print:w-[210mm] mx-auto">
          <Presupuesto modeloId={modeloId} vendedorId={vendedorId} />
        </div>
      </main>
    </div>
  );
}

export default function PresupuestoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#eaeaea] flex items-center justify-center text-fiatDark font-bold">Cargando vista...</div>}>
      <PresupuestoViewContent />
    </Suspense>
  );
}
