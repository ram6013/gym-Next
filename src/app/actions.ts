"use server";

import { supabase } from "../../lib/SupebaseClient";
import { Rutina } from "../../lib/types";


export async function createRutina(rutina: Partial<Rutina>) {
  const { nombre } = rutina;
  if (!nombre) return { error: "Nombre es requerido" };

  const { data, error } = await supabase.from("rutinas").insert({
    nombre: rutina.nombre,
    user_id: rutina.id_user,
  }).select("id");

  if (error) {
    return { error: error.message };
  }
  return { data: data };
}

export async function getRutinas({ userId }: { userId: number | null }) {
  const { data, error } = await supabase.from("rutinas").select("*").eq("user_id", userId);
  if (error) {
    return { error: error.message };
  }

  return { data: data };
}


export async function deleteRutina(id: number) {
  const { data, error } = await supabase.from("rutinas").delete().eq("id", id);
  if (error) {
    return { error: error.message };
  }
  return { data: data };
}