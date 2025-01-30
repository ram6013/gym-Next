"use server";

import { supabase } from "../../lib/SupebaseClient";
import { Info, Rutina, ejercicio } from "../../lib/types";


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


export async function deleteRutina({user_id, id}: {user_id: number, id: number}) {
  const { data, error } = await supabase.from("rutinas").delete().eq("id" , id ).eq("user_id", user_id);
  if (error) {
    return { error: error.message };
  }
  return { data: data };
}


export async function updateEjercicio(ejercicio: Partial<ejercicio>) {
  const { data, error } = await supabase
    .from("ejercicios")
    .insert({
      name: ejercicio.name,
      rutina_id: ejercicio.rutina_id,
      num_ex: ejercicio.num_ex,
    });
  if (error) {
    return { error: error.message };
  }
  return { data: data };
}

export async function updateInfo(info: Partial<Info>) {
  const { data, error } = await supabase.from("info").insert({
    ejercicio_id: info.ejercicio_id,
    kg: info.kg,
    rpe: info.rpe,
    reps: info.reps,
    num_sets: info.num_sets,
  });
  if (error) {
    return { error: error.message };
  }
  return { data: data };
}
 