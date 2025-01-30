"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { supabase } from "../../lib/SupebaseClient";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";
import { useUserId } from "@/app/Context/UserContext";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useUserId();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("usuario", user)
      .single();

    if (error) {
      toast.error(error.message);
    } else {
      if (data && data.contrasena) {
        const isMatch = await bcrypt.compare(password, data.contrasena);

        if (isMatch) {
          toast.success("Inicio de sesión exitoso");
          setUserId(data.id);

          document.cookie = `id=${data.id}`;
          router.push("Home");
        } else {
          toast.error("Credenciales incorrectas");
          setPassword("");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex w-full justify-center bg-negro min-h-14 text-center">
        <h1 className="text-4xl lg:text-5xl text-center font-bold text-orange mt-3 mb-3">
          GYM Notes
        </h1>
      </div>
      <div className="absolute flex h-screen w-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center bg-negro w-[90%] lg:w-[50%] lg:p-4 rounded-md"
        >
          <label
            htmlFor="user"
            className="text-4xl text-orange font-extrabold mb-4 mt-3"
          >
            Usuario:
          </label>
          <input
            type="user"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-[90%]"
          />
          <label
            htmlFor="password"
            className="text-4xl text-orange font-extrabold mb-4 mt-3"
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-[90%]"
          />
          <button
            type="submit"
            className="border-orange border-4 text-orange font-extrabold py-2 px-4 rounded-md mt-5 lg:text-4xl mb-4"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}