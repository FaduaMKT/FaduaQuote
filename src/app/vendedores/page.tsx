"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Pencil, Archive, UserPlus, X, RefreshCw, ListChecks } from "lucide-react";
import data from "@/data/vendedores.json";
import modelosData from "@/data/modelos.json";
import { supabase } from "@/lib/supabase";

interface Vendedor {
  id: string;
  provincia: string;
  nombre: string;
  mail: string;
  cel: string;
  foto: string;
  activo?: boolean;
  presupuestos?: string[];
}

function VendedoresContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const provinciaParam = searchParams.get("provincia")?.toLowerCase() || "";

  // Hold all vendors in state for local storage persistence
  const [allVendedores, setAllVendedores] = useState<Vendedor[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [viewArchived, setViewArchived] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendedor, setEditingVendedor] = useState<Vendedor | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    mail: "",
    cel: "",
    foto: "",
  });

  // Modelos State
  const [modelos, setModelos] = useState<any[]>([]);

  // Assign Models Modal State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assigningVendedor, setAssigningVendedor] = useState<Vendedor | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  useEffect(() => {
    setIsClient(true);
    // Security redirect check
    const tokenCookie = document.cookie.includes("auth_token=");
    const tokenLocal = localStorage.getItem("auth_token");
    if (!tokenCookie && !tokenLocal) {
      router.replace("/login");
      return;
    }

    const loadData = async () => {
      // Load Supabase Vendedores
      const { data: supVendedores, error: errV } = await supabase.from("vendedores").select("*");
      if (!errV && supVendedores && supVendedores.length > 0) {
        setAllVendedores(supVendedores);
        localStorage.setItem("fadua_vendedores", JSON.stringify(supVendedores));
      } else {
        const stored = localStorage.getItem("fadua_vendedores");
        if (stored) {
          try { setAllVendedores(JSON.parse(stored)); } catch (e) { setAllVendedores(data.vendedores); }
        } else {
          setAllVendedores(data.vendedores);
        }
      }

      // Load Supabase Modelos
      const { data: supModelos, error: errM } = await supabase.from("modelos").select("id, titulo, subtitulo, plan");
      if (!errM && supModelos && supModelos.length > 0) {
        setModelos(supModelos);
      } else {
        const storedMod = localStorage.getItem("fadua_modelos");
        if (storedMod) {
          try { setModelos(JSON.parse(storedMod)); } catch (e) { setModelos(modelosData.modelos); }
        } else {
          setModelos(modelosData.modelos);
        }
      }
    };
    loadData();
  }, [router]);

  // Sync to local storage every time allVendedores changes
  useEffect(() => {
    if (isClient && allVendedores.length > 0) {
      localStorage.setItem("fadua_vendedores", JSON.stringify(allVendedores));
    }
  }, [allVendedores, isClient]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#eaeaea] flex items-center justify-center text-fiatDark font-bold">
        Cargando...
      </div>
    );
  }

  // Formatting Title
  const title = provinciaParam
    ? provinciaParam.charAt(0).toUpperCase() + provinciaParam.slice(1)
    : "Desconocida";

  // Filter for display
  const displayedVendedores = allVendedores.filter((v) => {
    const matchesProvince = v.provincia.toLowerCase() === provinciaParam;
    const isActivo = v.activo !== false;
    return matchesProvince && (viewArchived ? !isActivo : isActivo);
  });

  const handleOpenModal = (vendedor?: Vendedor) => {
    if (vendedor) {
      setEditingVendedor(vendedor);
      setFormData({
        nombre: vendedor.nombre,
        mail: vendedor.mail,
        cel: vendedor.cel,
        foto: vendedor.foto,
      });
    } else {
      setEditingVendedor(null);
      setFormData({ nombre: "", mail: "", cel: "", foto: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVendedor(null);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVendedor) {
      // Edit
      const { error } = await supabase.from("vendedores").update({
        nombre: formData.nombre,
        mail: formData.mail,
        cel: formData.cel,
        foto: formData.foto,
      }).eq("id", editingVendedor.id);
      
      setAllVendedores((prev) =>
        prev.map((v) =>
          v.id === editingVendedor.id ? { ...v, ...formData } : v
        )
      );
    } else {
      // Create
      const newVendedorPayload = {
        provincia: provinciaParam,
        activo: true,
        nombre: formData.nombre,
        mail: formData.mail,
        cel: formData.cel,
        foto: formData.foto,
        presupuestos: []
      };
      const { data: resData, error } = await supabase.from("vendedores").insert([newVendedorPayload]).select();
      if (!error && resData && resData.length > 0) {
        setAllVendedores((prev) => [...prev, resData[0]]);
      } else {
        const newVendedor: Vendedor = {
          id: `v_${Date.now()}`,
          ...newVendedorPayload
        };
        setAllVendedores((prev) => [...prev, newVendedor]);
      }
    }
    handleCloseModal();
  };

  const handleArchiveMerge = async (id: string, archive: boolean) => {
    const actionText = archive ? "archivar" : "restaurar";
    if (window.confirm(`¿Está seguro de que desea ${actionText} este vendedor?`)) {
      await supabase.from("vendedores").update({ activo: !archive }).eq("id", id);
      setAllVendedores((prev) =>
        prev.map((v) => (v.id === id ? { ...v, activo: !archive } : v))
      );
    }
  };

  const handleOpenAssignModal = (vendedor: Vendedor) => {
    setAssigningVendedor(vendedor);
    setSelectedModels(vendedor.presupuestos || []);
    setIsAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
    setAssigningVendedor(null);
  };

  const handleSaveAssignModal = async () => {
    if (assigningVendedor) {
      await supabase.from("vendedores").update({ presupuestos: selectedModels }).eq("id", assigningVendedor.id);
      setAllVendedores((prev) =>
        prev.map((v) =>
          v.id === assigningVendedor.id ? { ...v, presupuestos: selectedModels } : v
        )
      );
    }
    handleCloseAssignModal();
  };

  const toggleModelSelection = (id: string) => {
    if (selectedModels.includes(id)) {
      setSelectedModels(selectedModels.filter(m => m !== id));
    } else {
      setSelectedModels([...selectedModels, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaeaea] text-fiatDark font-sans pb-12">
      {/* Top Bar */}
      <header className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] px-6 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-10 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link
            href="/provincias"
            className="shrink-0 w-10 h-10 rounded-full bg-[#f4f4f4] hover:bg-[#e0e0e0] flex items-center justify-center text-fiatDark transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-[20px] font-black text-fiatDark m-0 truncate">
            Vendedores - <span className="text-fiatRed">{title}</span>
          </h1>
        </div>
        
        <div className="flex w-full md:w-auto gap-3 items-center">
          {/* Toggle Button */}
          <button
            onClick={() => setViewArchived(!viewArchived)}
            className="flex-1 md:flex-none bg-[#f2f2f2] hover:bg-[#e5e5e5] text-fiatDark text-[13px] font-bold py-2.5 px-4 rounded-[8px] transition-colors whitespace-nowrap"
          >
            {viewArchived ? "Ver Activos" : "Ver Archivados"}
          </button>
          
          {/* Add Button */}
          <button
            onClick={() => handleOpenModal()}
            className="flex-1 md:flex-none bg-fiatRed hover:bg-[#b30000] text-white text-[14px] font-bold py-2.5 px-5 rounded-[8px] transition-colors flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(212,0,0,0.2)] whitespace-nowrap"
          >
            <UserPlus size={18} />
            <span className="hidden sm:inline">NUEVO VENDEDOR</span>
            <span className="sm:hidden">NUEVO</span>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        {displayedVendedores.length === 0 ? (
          <div className="bg-white rounded-[16px] p-12 text-center shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-[#eee]">
            <h2 className="text-[20px] font-black mb-2 text-[#444]">
              {viewArchived
                ? "No hay vendedores archivados."
                : "No hay vendedores activos."}
            </h2>
            <p className="text-[#888] font-medium">
              {viewArchived
                ? "Los vendedores archivados aparecerán aquí."
                : `Haga clic en el botón superior para agregar el primer vendedor de ${title}.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedVendedores.map((v) => (
              <div
                key={v.id}
                className={`bg-white rounded-[16px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow border border-transparent hover:border-[#eee] flex flex-col items-center text-center ${
                  viewArchived ? "opacity-60 grayscale-[20%]" : ""
                }`}
              >
                {/* Photo */}
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-[#f0f0f0] mb-4 border-4 border-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                  <img
                    src={v.foto.startsWith("data:") || v.foto.startsWith("http") ? v.foto : `/${v.foto}`}
                    alt={v.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?name=" + v.nombre.replace(" ", "+") + "&background=random";
                    }}
                  />
                </div>
                
                {/* Info */}
                <h3 className="font-black text-[16px] leading-tight mb-1 text-fiatDark">
                  {v.nombre}
                </h3>
                <p className="text-[12px] font-semibold text-[#666] mb-1 truncate w-full">
                  {v.mail}
                </p>
                <p className="text-[12px] font-semibold text-[#666] mb-5">
                  {v.cel}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-center gap-2 mt-auto w-full pt-4 border-t border-[#f2f2f2]">
                  {!viewArchived ? (
                    <>
                      <Link
                        href={`/presupuestos?vendedorId=${v.id}`}
                        className="flex-1 bg-[#f8f8f8] hover:bg-[#ececec] text-fiatDark p-2 rounded-[8px] flex justify-center transition-colors tooltip"
                        title="Ver Cotizaciones"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        onClick={() => handleOpenAssignModal(v)}
                        className="flex-1 bg-[#f8f8f8] hover:bg-[#e4ecff] text-[#003cb3] p-2 rounded-[8px] flex justify-center transition-colors tooltip"
                        title="Asignar Modelos"
                      >
                        <ListChecks size={18} />
                      </button>
                      <button
                        onClick={() => handleOpenModal(v)}
                        className="flex-1 bg-[#f8f8f8] hover:bg-[#ececec] text-fiatDark p-2 rounded-[8px] flex justify-center transition-colors tooltip"
                        title="Editar Vendedor"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleArchiveMerge(v.id, true)}
                        className="flex-1 bg-[#fff0f0] hover:bg-[#ffe0e0] text-fiatRed p-2 rounded-[8px] flex justify-center transition-colors tooltip"
                        title="Archivar"
                      >
                        <Archive size={18} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleArchiveMerge(v.id, false)}
                      className="w-full bg-[#f0faeb] hover:bg-[#e1f5d8] text-[#3e8a20] p-2 rounded-[8px] flex justify-center items-center gap-2 font-bold text-[13px] transition-colors"
                      title="Restaurar"
                    >
                      <RefreshCw size={16} /> RESTAURAR
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] shadow-[0_12px_48px_rgba(0,0,0,0.3)] w-full max-w-[500px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-fiatDark px-6 py-4 flex justify-between items-center">
              <h2 className="text-white font-black text-[18px]">
                {editingVendedor ? "Editar Vendedor" : "Nuevo Vendedor"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-fiatRed transition-colors bg-white/10 rounded-full p-1 border-none cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSaveModal} className="space-y-4">
                
                {/* Fixed Province Field */}
                <div>
                  <label className="block text-[12px] font-bold text-[#666] mb-1">
                    PROVINCIA ASIGNADA
                  </label>
                  <input
                    type="text"
                    value={title}
                    disabled
                    className="w-full bg-[#f2f2f2] border-[1.5px] border-[#ddd] rounded-[8px] px-4 py-2.5 text-[14px] text-[#999] cursor-not-allowed font-bold"
                  />
                </div>

                {/* Form Fields */}
                <div>
                  <label className="block text-[12px] font-bold text-fiatDark mb-1">
                    NOMBRE COMPLETO
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full bg-white border-[1.5px] border-[#ddd] rounded-[8px] px-4 py-2.5 text-[14px] text-fiatDark focus:outline-none focus:border-fiatRed focus:ring-1 focus:ring-fiatRed transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-fiatDark mb-1">
                    CORREO ELECTRÓNICO (EMAIL)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.mail}
                    onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                    className="w-full bg-white border-[1.5px] border-[#ddd] rounded-[8px] px-4 py-2.5 text-[14px] text-fiatDark focus:outline-none focus:border-fiatRed focus:ring-1 focus:ring-fiatRed transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-fiatDark mb-1">
                    TELÉFONO CELULAR
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cel}
                    onChange={(e) => setFormData({ ...formData, cel: e.target.value })}
                    className="w-full bg-white border-[1.5px] border-[#ddd] rounded-[8px] px-4 py-2.5 text-[14px] text-fiatDark focus:outline-none focus:border-fiatRed focus:ring-1 focus:ring-fiatRed transition-colors"
                    placeholder="Ej: (0387) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-fiatDark mb-1">
                    FOTO DE PERFIL
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, foto: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full bg-white border-[1.5px] border-[#ddd] rounded-[8px] px-4 py-2.5 text-[14px] text-fiatDark file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#f2f2f2] file:text-fiatDark hover:file:bg-[#e5e5e5] transition-colors cursor-pointer"
                  />
                  {formData.foto && formData.foto.startsWith("data:") ? (
                     <div className="mt-2 text-[11px] text-[#3e8a20] font-bold">Imagen cargada correctamente.</div>
                  ) : (
                     <input
                      type="text"
                      value={formData.foto}
                      onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                      className="w-full mt-2 bg-white border-[1.5px] border-[#ddd] rounded-[8px] px-4 py-2 text-[12px]"
                      placeholder="assets/vendedores/placeholder.png"
                     />
                  )}
                  <p className="text-[11px] text-[#888] font-semibold mt-1">
                    Sube una imagen o ingresa una ruta.
                  </p>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-[#eee] hover:bg-[#ddd] text-fiatDark font-bold py-2.5 px-6 rounded-[8px] transition-colors"
                  >
                    CANCELAR
                  </button>
                  <button
                    type="submit"
                    className="bg-fiatRed hover:bg-[#b30000] text-white font-bold py-2.5 px-6 rounded-[8px] transition-colors"
                  >
                    GUARDAR
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

      {/* Assign Models Modal */}
      {isAssignModalOpen && assigningVendedor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] shadow-[0_12px_48px_rgba(0,0,0,0.3)] w-full max-w-[500px] flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-fiatDark px-6 py-4 flex justify-between items-center rounded-t-[20px] shrink-0">
              <h2 className="text-white font-black text-[18px]">
                Presupuestos de {assigningVendedor.nombre}
              </h2>
              <button
                onClick={handleCloseAssignModal}
                className="text-white hover:text-fiatRed transition-colors bg-white/10 rounded-full p-1 border-none cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-[13px] text-[#666] font-semibold mb-4">
                Seleccione los modelos que este vendedor podrá cotizar:
              </p>
              <div className="space-y-2">
                {modelos.map((m) => (
                  <label key={m.id} className="flex items-center gap-3 p-3 border border-[#eee] rounded-[10px] hover:bg-[#f9f9f9] cursor-pointer transition-colors">
                    <input 
                      type="checkbox"
                      checked={selectedModels.includes(m.id)}
                      onChange={() => toggleModelSelection(m.id)}
                      className="w-5 h-5 accent-fiatRed cursor-pointer"
                    />
                    <div>
                      <h4 className="font-black text-fiatDark text-[14px] leading-tight">{m.titulo} {m.subtitulo}</h4>
                      <p className="font-bold text-[12px] text-[#888]">{m.plan}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#eee] bg-white rounded-b-[20px] flex justify-end gap-3 shrink-0">
              <button
                onClick={handleCloseAssignModal}
                className="bg-[#eee] hover:bg-[#ddd] text-fiatDark font-bold py-2.5 px-6 rounded-[8px] transition-colors"
              >
                CANCELAR
              </button>
              <button
                onClick={handleSaveAssignModal}
                className="bg-fiatRed hover:bg-[#b30000] text-white font-bold py-2.5 px-6 rounded-[8px] transition-colors"
              >
                GUARDAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VendedoresPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#eaeaea] flex items-center justify-center font-bold">Cargando datos...</div>}>
      <VendedoresContent />
    </Suspense>
  );
}
