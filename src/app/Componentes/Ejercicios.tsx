"use client";
import { useState } from "react";

export default function Ejercicios({name}: {name: string}) {

    const [numEx, setNumEx] = useState(0);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setNumEx(0);
        return;
      }
      if (parseInt(e.target.value) > 20) {
        setNumEx(20);
        return;
      }
      if (parseInt(e.target.value) < 1) {
        setNumEx(0);
        return;
      }
      setNumEx(parseInt(e.target.value));
    }

      const NoInputBar =
        "resize-none scrollbar-hide [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
    return (
        <div
      >
        <h1 className="text-center text-orange font-bold text-4xl">
          {name}
        </h1>
        <div className="flex ml-5 ">
          <label className="text-orange font-bold mr-5" htmlFor="NumbEx">
            Nº Ex:
          </label>
          <input
            type="number"
            id="numEx"
            className={
              "w-[5%]  border border-gray-500 mr-5 text-center" + NoInputBar
            }
            max={20}
            min={1}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex">
          {[...Array(numEx)].map((_, i) => (
            <div key={i}>
                <h1>Ejercicio1:</h1>
            </div>
          ))}
        <div className="absolute bottom-2 flex w-full justify-around">
          <button className="text-orange font-bold">Delete</button>
          <button className="text-orange font-bold">Save</button>
        </div>
      </div>
      </div>
    );
  }