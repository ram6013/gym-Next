"use client";
import { useState } from "react";
import Series from "./Series";
import toast from "react-hot-toast";

export default function Ejercicios({ name }: { name: string }) {
  const [numEx, setNumEx] = useState(0);
  const [openSeries, setOpenSeries] = useState(false);
  const [reps, setReps] = useState(0);
  const [text, setText] = useState<string[]>([]);

  const handleOpenSeries = () => {
    if (reps === 0) {
      toast.error("No hay series que mostrar");
      return;
    }
    setOpenSeries(!openSeries);
  };

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

  const handleOnChangeSeries = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) value = 0;
    if (value > 6) value = 6;

    setReps(value);
    setOpenSeries(true);
  };

  const Botones =
    "text-orange font-bold border-orange lg:text-2xl border-4 p-3 rounded-lg hover:text-white hover:border-white";
  const NoInputBar =
    "resize-none scrollbar-hide [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="flex flex-col h-auto min-h-96 m-5  :w-auto" >
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
            handleOnChangeSeries={(e) => handleOnChangeSeries(e)}
            handleOpenSeries={handleOpenSeries}
            openSeries={openSeries}
            NoInputBar={NoInputBar}
            setText={setText}
            reps={reps}
          />
        ))}
      </div>
      <div className="flex mt-5 w-full justify-around">
        <button className={Botones}>Delete</button>
        <button className={Botones}>Save</button>
      </div>
    </div>
  );
}
