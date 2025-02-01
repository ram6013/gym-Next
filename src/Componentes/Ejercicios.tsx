"use client";
import { useState } from "react";
import Series from "./Series";
import { deleteRutina, updateRutina } from "@/app/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateEjercicio } from "@/app/actions";

export default function Ejercicios({
  name,
  rutina_id,
  userId,
  num_ex,
}: {
  name: string;
  rutina_id: number;
  userId: number;
  num_ex: number;
}) {
  const [numEx, setNumEx] = useState(num_ex);
  const [text, setText] = useState<string[]>(["Ejercicios"]);
  const router = useRouter();

  const id_pass = { user_id: userId, id: rutina_id };

  const handleOnChangeReps = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);

    if (isNaN(value) || value < 1) value = 0;
    if (value > 10) value = 10;
    setNumEx(value);
    setText((prevText) => {
      if (value > prevText.length) {
        return [
          ...prevText,
          ...Array(value - prevText.length).fill("Ejercicio"),
        ];
      } else {
        return prevText.slice(0, value);
      }
    });
  };

  const changeCero = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      e.target.value = "";
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteRutina(id_pass);
      if (response.error) {
        toast.error("No se pudo eliminar la rutina");
        console.log("esto es el error", response.error);
      } else {
        console.log("esto es el data", response.data);
        toast.success("Rutina eliminada");
        router.refresh();
      }
    } catch (error) {
      toast.error("No se pudo eliminar la rutina");
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.forms.namedItem("form") as HTMLFormElement;
    const rutina = {
      num_ex: parseInt(form.ejercicios.value, 10),
      id: rutina_id,
    };
    const ejercicio = {
      num_series: form.series.value,
      rutinas_id: rutina_id,
      name: form.nombre_serie.value,
    };

    const response = await updateRutina(rutina);
    if (response.error) {
      toast.error("No se pudo actualizar la rutina");
      console.log("esto es lo que esta fallando: ", response.error);
    } else {
      const response2 = await updateEjercicio(ejercicio);
      if (response2.error) {
        toast.error("No se pudo actualizar la rutina");
        console.log("esto es lo que esta fallando: ", response2.error);
      } else {
        toast.success("Rutina actualizada");
        router.refresh();
      }
    }
  };

  const Botones =
    "text-orange font-bold border-orange lg:text-2xl border-4 p-3 rounded-lg hover:text-white hover:border-white";
  const NoInputBar =
    "resize-none scrollbar-hide [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <form
      name="form"
      className="flex flex-col h-auto min-h-96 m-5  :w-auto"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-orange font-bold text-4xl">{name}</h1>
      <div className="flex">
        <label className="text-orange font-bold mr-5" htmlFor="NumbEx">
          Nº Ex:
        </label>
        <input
          name="ejercicios"
          type="number"
          id="numEx"
          onFocus={(e) => changeCero(e)}
          className={
            "w-[10%]  lg:w-[5%] border border-gray-500 mr-5 text-center bg-gray-400 text-white font-extrabold " +
            NoInputBar
          }
          max={20}
          min={1}
          value={numEx}
          onChange={handleOnChangeReps}
        />
      </div>
      <div className="flex flex-col gap-6 w-full flex-grow">
        {[...Array(numEx)].map((_, i) => (
          <Series
            key={i}
            index={i}
            text={text}
            NoInputBar={NoInputBar}
            setText={setText}
          />
        ))}
      </div>
      <div className="flex mt-5 w-full justify-around">
        <button className={Botones} onClick={handleDelete}>
          Delete
        </button>
        <button type="submit" className={Botones}>
          Save
        </button>
      </div>
    </form>
  );
}
