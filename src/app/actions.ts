"use server";

import { supabase } from "../../lib/SupebaseClient";
import { Rutina } from "../../lib/types";

export async function createRutina(rutina: Partial<Rutina>) {
  const { nombre } = rutina;
  if (!nombre) return { error: "Nombre es requerido" };

  const { data, error } = await supabase.from("rutinas").insert({
    nombre: rutina.nombre,
  }).select("id");

  if (error) {
    return { error: error.message };
  }

  return { data: data };
}

export async function getRutinas() {
  const { data, error } = await supabase.from("rutinas").select("*");

  if (error) {
    return { error: error.message };
  }

  return { data: data };
}