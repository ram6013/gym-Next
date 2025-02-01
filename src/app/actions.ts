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
export async function updateRutina(rutina: Partial<Rutina>) {
  console.log("esto es el rutina",rutina.num_ex);
  console.log("esto es el id", rutina.id);
  const { data, error } = await supabase
    .from("rutinas")
    .update({
      num_ex: rutina.num_ex,
    })
    .eq("id", rutina.id);
  if (error) {
    return { error: error.message };
  }
  return { data: data };
}

export async function updateEjercicio(ejercicio: Partial<ejercicio>) {
  const { data, error } = await supabase.from("ejercicios").insert({
    name: ejercicio.name,
    rutinas_id: ejercicio.rutinas_id, 
    num_series: ejercicio.num_series,
  }).eq("id", ejercicio.rutinas_id);
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
 