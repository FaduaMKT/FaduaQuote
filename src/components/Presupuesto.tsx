import React from "react";
import modelosDataObj from "@/data/modelos.json";
import vendedoresDataObj from "@/data/vendedores.json";

// Typed definitions
export interface Modelo {
  id: string;
  titulo: string;
  subtitulo: string;
  plan: string;
  adjudicacion: string;
  valorUnidad: number;
  cuotas: {
    c1: number;
    c2_12: number;
    c13_84: number;
    alicuota: number;
  };
  textoPromo: string;
  imagen: string;
}

export interface Vendedor {
  id: string;
  provincia: string;
  nombre: string;
  mail: string;
  cel: string;
  foto: string;
  activo: boolean;
  presupuestos: string[];
}

export interface ContactoEmpresa {
  direccion: string;
  mail: string;
  cel: string;
  logo: string;
}

export interface PresupuestoProps {
  modeloId: string;
  vendedorId: string;
}

// Utility to format currency
const formatCurrency = (val: number) => "$" + val.toLocaleString("es-AR");

export default function Presupuesto({
  modeloId,
  vendedorId,
}: PresupuestoProps) {
  const modelosData = modelosDataObj as { textoLegal: string; modelos: Modelo[] };
  const vendedoresData = vendedoresDataObj as { vendedores: Vendedor[]; contactoEmpresa: ContactoEmpresa };

  const modelo = modelosData.modelos.find((m) => m.id === modeloId);
  const vendedor = vendedoresData.vendedores.find((v) => v.id === vendedorId);
  
  if (!modelo || !vendedor) {
    return <div className="p-10 text-red-500 font-bold">Error: Modelo o Vendedor no encontrado.</div>;
  }

  const { contactoEmpresa } = vendedoresData;
  const textoLegal = modelosData.textoLegal;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white pt-[8mm] pb-[8mm] pl-[10mm] pr-[10mm] mx-auto relative shadow-[0_4px_12px_rgba(0,0,0,0.1)] print:w-full print:min-h-0 print:m-0 print:p-0 print:shadow-none print:break-after-avoid print:break-inside-avoid max-[220mm]:w-full max-[220mm]:p-[15px]">
      
      {/* TITULO PRINCIPAL */}
      <div className="text-[90px] font-black text-black mb-[5px] leading-[0.9] max-[220mm]:text-[70px]">
        {modelo.titulo}
      </div>

      {/* MODELO Y PLAN */}
      <div className="mb-[15px]">
        <h3 className="mt-[3px] mb-0 font-black text-[22px] text-black">
          {modelo.subtitulo.toUpperCase()}
        </h3>
        <h2 className="m-0 font-bold text-[28px] text-black">
          {modelo.plan}
        </h2>
      </div>

      {/* AUTO + ASESOR EN LA MISMA LINEA */}
      <div className="flex justify-between items-center gap-[20px] mb-[20px] flex-wrap max-[220mm]:flex-col max-[220mm]:items-stretch">
        
        {/* Datos del asesor */}
        <div className="flex-1 flex items-center gap-[12px] bg-[#f8f8f8] p-[10px] rounded-[16px] shadow-[0_2px_6px_rgba(0,0,0,0.05)] max-[220mm]:order-1">
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#ccc] shrink-0 border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/${vendedor.foto}`} alt="Asesor" className="w-full h-full object-cover" />
          </div>
          <div className="info">
            <p className="my-[3px] text-[12px] text-[#333]">
              <strong className="font-bold text-black">Asesor:</strong> {vendedor.nombre}
            </p>
            <p className="my-[3px] text-[12px] text-[#333]">
              <strong className="font-bold text-black">Mail:</strong> {vendedor.mail}
            </p>
            <p className="my-[3px] text-[12px] text-[#333]">
              <strong className="font-bold text-black">Cel:</strong> {vendedor.cel}
            </p>
          </div>
        </div>

        {/* Imagen del auto */}
        <div className="flex-1 max-w-[240px] h-auto rounded-[12px] overflow-hidden bg-white max-[220mm]:order-2 max-[220mm]:max-w-full relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/${modelo.imagen}`} alt="Vehículo" className="w-full h-auto block object-contain mix-blend-multiply" />
        </div>
      </div>

      {/* BLOQUES PRINCIPALES */}
      <div className="flex gap-[12px] mb-[20px] max-[220mm]:flex-col">
        <div className="flex-1 bg-fiatDark text-white p-[12px] rounded-[18px] text-center flex flex-col justify-center items-center">
          <span className="block font-semibold text-[12px] mb-[8px] w-full text-center">ADJUDICACIÓN ASEGURADA</span>
          <strong className="block text-[18px] font-black leading-[1.2] w-full text-center">
            {modelo.adjudicacion}
          </strong>
        </div>

        <div className="flex-1 bg-fiatDark text-white p-[12px] rounded-[18px] text-center flex flex-col justify-center items-center">
          <span className="block font-semibold text-[12px] mb-[8px] w-full text-center">VALOR DE LA UNIDAD</span>
          <strong className="block text-[28px] font-black leading-[1.2] w-full text-center">
            {formatCurrency(modelo.valorUnidad)}
          </strong>
        </div>
      </div>

      {/* RECTÁNGULOS (Hardcoded as requested by the template logic unless provided by JSON) */}
      <div className="grid grid-cols-4 gap-[10px] mb-[20px] max-[220mm]:grid-cols-2">
        <div className="border-[1.5px] border-[#333] rounded-[12px] py-[8px] px-[6px] text-center bg-[#fafafa]">
          <div className="bg-fiatDark text-white font-black rounded-[8px] mb-[6px] text-[22px] p-[6px]">
            0%
          </div>
          <p className="text-[9px] font-semibold mt-[4px] leading-[1.2] text-[#333]">
            INTERÉS HASTA<br/>LA ÚLTIMA CUOTA
          </p>
        </div>
        <div className="border-[1.5px] border-[#333] rounded-[12px] py-[8px] px-[6px] text-center bg-[#fafafa]">
          <div className="bg-fiatDark text-white font-black rounded-[8px] mb-[6px] text-[22px] p-[6px]">
            100%
          </div>
          <span className="block text-[10px] font-bold mt-[4px]">ARGENTINA</span>
          <p className="text-[9px] font-semibold mt-[4px] leading-[1.2] text-[#333]">
            PRODUCCIÓN Y<br/>ORGULLO NACIONAL
          </p>
        </div>
        <div className="border-[1.5px] border-[#333] rounded-[12px] py-[8px] px-[6px] text-center bg-[#fafafa]">
          <div className="bg-fiatDark text-white font-black rounded-[8px] mb-[6px] text-[11px] leading-[1.2] py-[8px] px-[4px]">
            ADELANTO DE<br/>CUOTAS
          </div>
          <p className="text-[9px] font-semibold mt-[4px] leading-[1.2] text-[#333]">
            A VALOR CUOTA PURA
          </p>
        </div>
        <div className="border-[1.5px] border-[#333] rounded-[12px] py-[8px] px-[6px] text-center bg-[#fafafa]">
          <div className="bg-fiatDark text-white font-black rounded-[8px] mb-[6px] text-[11px] leading-[1.2] py-[8px] px-[4px]">
            PACTO CLARO
          </div>
          <p className="text-[9px] font-semibold mt-[4px] leading-[1.2] text-[#333]">
            QUE TU PLAN SEA TAN CLARO COMO LAS GANAS DE TENER UN 0KM
          </p>
        </div>
      </div>

      {/* TABLA DE CUOTAS */}
      <div className="mb-[20px] border border-[#ddd] rounded-[12px] overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
        <div className="bg-fiatDark text-white p-[10px] text-center text-[13px] leading-[1.2]">
          <strong className="font-bold">VALOR DE CUOTAS</strong>{" "}
          <span className="font-normal text-[11px]">(de acuerdo al valor móvil de la unidad)</span>
        </div>

        <div className="bg-[#f9f9f9] border-b border-[#eee]">
          <div className="flex justify-between items-center py-[8px] px-[20px] text-[12px]">
            <span className="font-bold w-[55%] text-left">CUOTA 1 + SUSCRIPCIÓN</span>
            <strong className="font-bold w-[45%] text-right text-[#1a1a1a]">{formatCurrency(modelo.cuotas.c1)} aprox.</strong>
          </div>
        </div>
        <div className="bg-[#f9f9f9] border-b border-[#eee]">
          <div className="h-[1px] bg-[#ddd] my-[6px] mx-[16px]"></div>
          <div className="flex justify-between items-center py-[8px] px-[20px] text-[12px]">
            <span className="font-bold w-[55%] text-left">CUOTA 2 A 12</span>
            <strong className="font-bold w-[45%] text-right text-[#1a1a1a]">{formatCurrency(modelo.cuotas.c2_12)} aprox.</strong>
          </div>
        </div>
        <div className="bg-[#f9f9f9] border-b border-[#eee]">
          <div className="h-[1px] bg-[#ddd] my-[6px] mx-[16px]"></div>
          <div className="flex justify-between items-center py-[8px] px-[20px] text-[12px]">
            <span className="font-bold w-[55%] text-left">CUOTA 13 A 84</span>
            <strong className="font-bold w-[45%] text-right text-[#1a1a1a]">{formatCurrency(modelo.cuotas.c13_84)} aprox.</strong>
          </div>
        </div>

        <div className="bg-fiatDark text-white flex justify-center items-center py-[10px] px-[20px] text-[12px] font-bold text-center">
          <span className="text-center w-full">
            * ALICUOTA: {formatCurrency(modelo.cuotas.alicuota)} (CUOTA PURA PARA ADELANTAR)
          </span>
        </div>
      </div>

      {/* TEXTO PROMOCIONAL */}
      <div className="mb-[15px] text-[11px] leading-[1.4] text-[#333] bg-white p-[8px] rounded-[12px]">
        {modelo.textoPromo.split("\n").map((line, idx) => {
          // Add some very basic custom bold parsing if lines contain strong keywords.
          // By manual inspection of JSON prompt: certain keywords are uppercase
          let highlightedLine = line;
          const keywordsToBold = ["84 CUOTAS", "0% interés", "precio directo de fábrica sólo con tu DNI.", "ADJUDICACIÓN ESPECIAL", "ADJUDICACIÓN DIRECTA", "FINANCIADO CON TARJETA DE CRÉDITO."];
          
          let parsedLine: Array<React.ReactNode> = [line];
          
          keywordsToBold.forEach(keyword => {
            const temp: Array<React.ReactNode> = [];
            parsedLine.forEach(segment => {
              if (typeof segment === 'string' && segment.includes(keyword)) {
                const parts = segment.split(keyword);
                temp.push(parts[0]);
                temp.push(<strong key={keyword} className="font-bold text-black">{keyword}</strong>);
                temp.push(parts[1]);
              } else {
                temp.push(segment);
              }
            });
            parsedLine = temp;
          });

          return (
            <React.Fragment key={idx}>
              {parsedLine}
              <br />
            </React.Fragment>
          );
        })}
      </div>

      {/* LINEA DIVISORIA */}
      <div className="h-[1px] bg-gradient-to-r from-[#ccc] via-[#888] to-[#ccc] my-[15px]"></div>

      {/* LOGOS + DATOS DE CONTACTO */}
      <div className="flex justify-center items-center gap-[60px] mb-[15px] flex-wrap max-[220mm]:flex-col max-[220mm]:text-center max-[220mm]:gap-[20px]">
        <div className="flex-none">
          {contactoEmpresa.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/${contactoEmpresa.logo}`} alt="Logos" className="max-h-[60px] w-auto block max-[220mm]:mx-auto" />
          ) : (
            <div className="h-[60px] flex border justify-center items-center bg-[#eaeaea] w-[180px] max-[220mm]:mx-auto text-[10px]">
              [Logos Fadua / Fiat]
            </div>
          )}
        </div>

        <div className="flex-none text-[11px] text-left max-[220mm]:text-center">
          <p className="my-[3px] text-[#444]"><strong className="font-bold">{contactoEmpresa.direccion}</strong></p>
          <p className="my-[3px] text-[#444]"><strong className="font-bold">Mail:</strong> {contactoEmpresa.mail}</p>
          <p className="my-[3px] text-[#444]"><strong className="font-bold">Cel:</strong> {contactoEmpresa.cel}</p>
        </div>
      </div>

      {/* TEXTO LEGAL */}
      <div className="text-[9px] leading-[1.3] text-[#1a1a1a] text-justify mt-[10px] border-t border-[#eee] pt-[10px]">
        {textoLegal}
      </div>

    </div>
  );
}
