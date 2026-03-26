"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validUsername = process.env.NEXT_PUBLIC_AUTH_USERNAME?.trim();
    const validPassword = process.env.NEXT_PUBLIC_AUTH_PASSWORD?.trim();

    console.log("Expected Username:", validUsername);
    console.log("Expected Password:", validPassword);
    console.log("Entered Username:", username);
    console.log("Entered Password:", password);

    if (
      username === validUsername &&
      password === validPassword
    ) {
      // Create cookie so that Next.js middleware running on Edge can read it.
      // We also save it to localStorage as originally requested just in case.
      document.cookie = "auth_token=dummy_jwt_token_fiat_fadua; path=/";
      localStorage.setItem("auth_token", "dummy_jwt_token_fiat_fadua");
      
      router.push("/provincias");
    } else {
      setError("Credenciales incorrectas. Por favor, intente de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-[#eaeaea] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.1)] w-full max-w-[400px]">
        
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <h1 className="text-[32px] font-black text-fiatDark leading-tight mb-2">
            Fadua<span className="text-fiatRed">Quote</span>
          </h1>
          <p className="text-[#666] text-sm font-semibold">
            Portal de Asesores FIAT
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          <div>
            <label className="block text-[12px] font-bold text-fiatDark mb-2" htmlFor="username">
              USUARIO
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#f8f8f8] border-[1.5px] border-[#ddd] rounded-[8px] px-4 py-3 text-[14px] text-fiatDark focus:outline-none focus:border-fiatRed focus:ring-1 focus:ring-fiatRed transition-colors"
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-fiatDark mb-2" htmlFor="password">
              CONTRASEÑA
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f8f8f8] border-[1.5px] border-[#ddd] rounded-[8px] px-4 py-3 text-[14px] text-fiatDark focus:outline-none focus:border-fiatRed focus:ring-1 focus:ring-fiatRed transition-colors"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          {error && (
            <div className="text-[12px] font-bold text-fiatRed bg-[#fff0f0] p-3 rounded-[8px] text-center border border-[#ffcccc]">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-fiatDark hover:bg-[#1a1a1a] text-white font-bold py-3 px-4 rounded-[8px] transition-colors flex items-center justify-center gap-2 group"
          >
            INGRESAR
            <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

      </div>
    </div>
  );
}
