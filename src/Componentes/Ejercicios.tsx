"use client";
import { useState } from "react";
import Series from "./Series";
import { deleteRutina } from "@/app/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function Ejercicios({ name, id , userId}: { name: string, id: number, userId: number }) {
  const [numEx, setNumEx] = useState(0);
  const [text, setText] = useState<string[]>([]);
  const router = useRouter();

  const id_pass = {user_id: userId, id: id}
 


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
        console.log("esto es el error",response.error);
      } else {
        console.log("esto es el data",response.data);
        toast.success("Rutina eliminada");
        router.refresh();
      }
    } catch (error) {
      toast.error("No se pudo eliminar la rutina");
      console.log(error);
    }
  }
  const Botones =
    "text-orange font-bold border-orange lg:text-2xl border-4 p-3 rounded-lg hover:text-white hover:border-white";
  const NoInputBar =
    "resize-none scrollbar-hide [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="flex flex-col h-auto min-h-96 m-5  :w-auto">
      <h1 className="text-center text-orange font-bold text-4xl">{name}</h1>
      <div className="flex">
        <label className="text-orange font-bold mr-5" htmlFor="NumbEx">
          Nº Ex:
        </label>
        <input
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
        <button className={Botones}>Save</button>
      </div>
    </div>
  );
}
