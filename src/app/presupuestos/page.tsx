"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Download, Pencil, Settings, X } from "lucide-react";
import defaultModelos from "@/data/modelos.json";
import { supabase } from "@/lib/supabase";

interface Vendedor {
  id: string;
  provincia: string;
  nombre: string;
  mail: string;
  cel: string;
  foto: string;
  activo?: boolean;
  presupuestos: string[];
}

interface Cuotas {
  c1: number;
  c2_12: number;
  c13_84: number;
  alicuota: number;
}

interface Modelo {
  id: string;
  titulo: string;
  subtitulo: string;
  plan: string;
  adjudicacion: string;
  valorUnidad: number;
  cuotas: Cuotas;
  textoPromo: string;
  imagen: string;
}

function PresupuestosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vendedorId = searchParams.get("vendedorId") || "";

  const [isClient, setIsClient] = useState(false);
  const [vendedor, setVendedor] = useState<Vendedor | null>(null);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModelos, setEditingModelos] = useState<Modelo[]>([]);

  useEffect(() => {
    setIsClient(true);
    
    // Auth check
    const tokenCookie = document.cookie.includes("auth_token=");
    const tokenLocal = localStorage.getItem("auth_token");
    if (!tokenCookie && !tokenLocal) {
      router.replace("/login");
      return;
    }

    const loadData = async () => {
      // Load Vendedor
      const storedVendedores = localStorage.getItem("fadua_vendedores");
      if (storedVendedores) {
        try {
          const parsedVendedores: Vendedor[] = JSON.parse(storedVendedores);
          const found = parsedVendedores.find((v) => v.id === vendedorId);
          if (found) {
            setVendedor({ ...found, presupuestos: found.presupuestos || [] });
          }
        } catch (e) {
          console.error(e);
        }
      }

      // Load Supabase Modelos
      const { data: supModelos, error: errM } = await supabase.from("modelos").select("*");
      if (!errM && supModelos && supModelos.length > 0) {
        const formatted = supModelos.map(m => ({
          ...m,
          valorUnidad: m.valor_unidad,
          textoPromo: m.texto_promo,
          textoLegal: m.texto_legal,
          cuotas: {
            c1: m.cuota_c1,
            c2_12: m.cuota_c2_12,
            c13_84: m.cuota_c13_84,
            alicuota: m.alicuota
          }
        }));
        setModelos(formatted);
        localStorage.setItem("fadua_modelos", JSON.stringify(formatted));
      } else {
        // Fallback
        const storedModelos = localStorage.getItem("fadua_modelos");
        if (storedModelos) {
          try {
            setModelos(JSON.parse(storedModelos));
          } catch (e) {
            setModelos(defaultModelos.modelos);
          }
        } else {
          setModelos(defaultModelos.modelos);
          localStorage.setItem("fadua_modelos", JSON.stringify(defaultModelos.modelos));
        }
      }
    };
    
    loadData();
  }, [router, vendedorId]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#eaeaea] flex items-center justify-center text-fiatDark font-bold">
        Cargando...
      </div>
    );
  }

  if (!vendedor) {
    return (
      <div className="min-h-screen bg-[#eaeaea] flex items-center justify-center text-fiatDark font-bold flex-col gap-4">
        <h2>Vendedor no encontrado.</h2>
        <Link href="/provincias" className="bg-fiatRed text-white px-6 py-2 rounded-lg font-bold">Volver</Link>
      </div>
    );
  }

  // Filter models for this vendor
  const vendorModelos = modelos.filter((m) => vendedor.presupuestos.includes(m.id));

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const openGlobalPricesModal = () => {
    // Make a deep copy for editing
    setEditingModelos(JSON.parse(JSON.stringify(modelos)));
    setIsModalOpen(true);
  };

  const handlePriceChange = (id: string, newPrice: string) => {
    const numericPrice = Number(newPrice.replace(/\D/g, ""));
    setEditingModelos((prev) =>
      prev.map((m) => (m.id === id ? { ...m, valorUnidad: numericPrice } : m))
    );
  };

  const saveGlobalPrices = async () => {
    setModelos(editingModelos);
    localStorage.setItem("fadua_modelos", JSON.stringify(editingModelos));
    setIsModalOpen(false);

    // Sync to Supabase
    Promise.all(
      editingModelos.map(m => 
        supabase.from("modelos").update({ valor_unidad: m.valorUnidad }).eq("id", m.id)
      )
    ).catch(console.error);
  };

  return (
    <div className="min-h-screen bg-[#eaeaea] text-fiatDark font-sans pb-12">
      {/* Global Price Editing Banner */}
      <div 
        onClick={openGlobalPricesModal}
        className="bg-fiatDark text-white py-3 px-6 text-center text-[13px] md:text-[14px] font-bold cursor-pointer hover:bg-[#1a1a1a] transition-colors flex items-center justify-center gap-3 shadow-md"
      >
        <Settings size={18} className="animate-[spin_4s_linear_infinite]"/>
        <span>⚙️ Editar precios globales — los cambios impactan a todos los vendedores</span>
      </div>

      {/* Top Bar */}
      <header className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] px-6 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-10 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link
            href={`/vendedores?provincia=${vendedor.provincia}`}
            className="shrink-0 w-10 h-10 rounded-full bg-[#f4f4f4] hover:bg-[#e0e0e0] flex items-center justify-center text-fiatDark transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f0f0f0]">
                <img
                  src={vendedor.foto.startsWith("data:") || vendedor.foto.startsWith("http") ? vendedor.foto : `/${vendedor.foto}`}
                  alt={vendedor.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://ui-avatars.com/api/?name=" + vendedor.nombre.replace(" ", "+") + "&background=random";
                  }}
                />
            </div>
            <div>
              <p className="text-[11px] text-[#888] font-bold uppercase tracking-wider leading-none mb-1">Cotizaciones de</p>
              <h1 className="text-[18px] font-black text-fiatDark m-0 truncate leading-none">
                {vendedor.nombre}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        {vendorModelos.length === 0 ? (
          <div className="bg-white rounded-[16px] p-12 text-center shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-[#eee]">
            <h2 className="text-[20px] font-black mb-2 text-[#444]">
              No hay cotizaciones asignadas.
            </h2>
            <p className="text-[#888] font-medium">
              Este vendedor no tiene modelos asignados para cotizar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {vendorModelos.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-[16px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow border border-transparent hover:border-[#eee] flex flex-col"
              >
                {/* Header (Plan) */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-[22px] leading-none mb-1 text-fiatDark uppercase">
                      {m.titulo}
                    </h3>
                    <p className="text-[14px] font-bold text-[#888] leading-none">
                      {m.subtitulo}
                    </p>
                  </div>
                  <span className="bg-fiatRed/10 text-fiatRed font-black text-[11px] px-3 py-1.5 rounded-[8px] whitespace-nowrap">
                    {m.plan}
                  </span>
                </div>

                {/* Photo */}
                <div className="w-full aspect-[16/9] mb-4 flex items-center justify-center">
                  <img
                    src={`/${m.imagen}`}
                    alt={`${m.titulo} ${m.subtitulo}`}
                    className="w-[90%] object-contain drop-shadow-xl"
                  />
                </div>
                
                {/* Price */}
                <div className="bg-[#f8f8f8] rounded-[12px] p-4 mb-5 text-center border border-[#eee]">
                  <p className="text-[11px] font-bold text-[#888] mb-1">PRECIO DE LISTA</p>
                  <p className="text-[24px] font-black text-fiatDark">{formatCurrency(m.valorUnidad)}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-2 mt-auto w-full pt-4 border-t border-[#f2f2f2]">
                  <Link
                    href={`/presupuesto?modeloId=${m.id}&vendedorId=${vendedor.id}`}
                    className="flex-1 bg-[#f8f8f8] hover:bg-[#ececec] text-fiatDark p-2.5 rounded-[8px] flex justify-center transition-colors tooltip"
                    title="Ver Cotización"
                  >
                    <Eye size={20} />
                  </Link>
                  <Link
                    href={`/presupuesto?modeloId=${m.id}&vendedorId=${vendedor.id}`}
                    className="flex-1 bg-[#f8f8f8] hover:bg-[#ececec] text-fiatDark p-2.5 rounded-[8px] flex justify-center transition-colors tooltip"
                    title="Imprimir PDF"
                  >
                    <Download size={20} />
                  </Link>
                  <button
                    onClick={openGlobalPricesModal}
                    className="flex-1 bg-[#fff0f0] hover:bg-[#ffe0e0] text-fiatRed p-2.5 rounded-[8px] flex justify-center transition-colors tooltip"
                    title="Editar Precios (Global)"
                  >
                    <Pencil size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Global Prices Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] shadow-[0_12px_48px_rgba(0,0,0,0.3)] w-full max-w-[800px] max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-fiatDark px-6 py-5 flex justify-between items-center shrink-0 rounded-t-[20px]">
              <div>
                <h2 className="text-white font-black text-[20px] leading-tight flex items-center gap-2">
                  <Settings size={20} className="text-fiatRed" />
                  Editar Precios Globales
                </h2>
                <p className="text-[#aaa] text-[13px] font-semibold mt-1">
                  Los cambios realizados aquí impactarán a TODOS los vendedores y cotizaciones.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-fiatRed transition-colors bg-white/10 rounded-full p-2 border-none cursor-pointer flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="p-6 overflow-y-auto flex-1 bg-[#fbfbfb]">
              <div className="space-y-3">
                {editingModelos.map((m) => (
                  <div key={m.id} className="bg-white border border-[#eee] rounded-[12px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:border-[#ddd] transition-colors">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-16 h-12 bg-[#f4f4f4] rounded-lg p-1 flex items-center justify-center shrink-0">
                         <img src={`/${m.imagen}`} alt={m.titulo} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-black text-fiatDark text-[15px] leading-tight uppercase">{m.titulo}</h4>
                        <p className="font-bold text-[#888] text-[12px]">{m.subtitulo} · {m.plan}</p>
                      </div>
                    </div>
                    <div className="w-full sm:w-[200px] shrink-0 relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#888]">$</span>
                       <input 
                         type="text"
                         value={m.valorUnidad.toLocaleString("es-AR")}
                         onChange={(e) => handlePriceChange(m.id, e.target.value)}
                         className="w-full bg-white border-[1.5px] border-[#ddd] rounded-[8px] pl-8 pr-4 py-2 text-[15px] text-fiatDark font-black focus:outline-none focus:border-fiatRed focus:ring-1 focus:ring-fiatRed transition-colors"
                       />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#eee] bg-white rounded-b-[20px] flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#eee] hover:bg-[#ddd] text-fiatDark font-bold py-2.5 px-6 rounded-[8px] transition-colors"
              >
                CANCELAR
              </button>
              <button
                onClick={saveGlobalPrices}
                className="bg-fiatRed hover:bg-[#b30000] text-white font-bold py-2.5 px-8 rounded-[8px] transition-colors shadow-lg shadow-fiatRed/20"
              >
                GUARDAR CAMBIOS
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function PresupuestosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#eaeaea] flex items-center justify-center text-fiatDark font-bold">Cargando datos...</div>}>
      <PresupuestosContent />
    </Suspense>
  );
}
