"use client";
import { useState } from "react";

export default function Ejercicios({ name }: { name: string }) {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [numEx, setNumEx] = useState(0);
  const [text, setText] = useState<string[]>([]);

  const handleDoubleClick = (index: number) => {
    setIsEditing(index);
  };

  const handleOnChangeText = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedTexts = [...text];
    updatedTexts[index] = e.target.value;
    setText(updatedTexts);
  };

  const handleOnBlur = () => {
    setIsEditing(null);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(null);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) value = 0;
    if (value > 20) value = 20;

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

  const NoInputBar =
    "resize-none scrollbar-hide [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div>
      <h1 className="text-center text-orange font-bold text-4xl">{name}</h1>
      <div className="flex ml-5">
        <label className="text-orange font-bold mr-5" htmlFor="NumbEx">
          Nº Ex:
        </label>
        <input
          type="number"
          id="numEx"
          className={
            "w-[5%] border border-gray-500 mr-5 text-center " + NoInputBar
          }
          max={20}
          min={1}
          value={numEx}
          onChange={handleOnChange}
        />
      </div>
      <div className="wrap flex flex-col mt-4 m-9 col-span-5">
        {[...Array(numEx)].map((_, i) => (
          <div key={i} className="mr-5">
            {isEditing === i ? (
              <input
                type="text"
                className="text-center border rounded px-2 py-1"
                value={text[i]}
                onChange={(e) => handleOnChangeText(e, i)}
                onBlur={handleOnBlur}
                onKeyDown={handleOnKeyDown}
                autoFocus
              />
            ) : (
              <div
                className="w-full flex items-center text-white font-extrabold text-2xl  text-center cursor-pointer"
                onDoubleClick={() => handleDoubleClick(i)}
              >
                <h1>{text[i]}</h1>
                <div className="flex flex-col ml-5 justify-center items-center">
                  <label htmlFor="Reps">Reps:</label>
                  <input id="Reps" type="number" className={"w-[15%] text-black text-center " + NoInputBar}></input>
                </div>
                <div className="flex flex-col ml-5 justify-center items-center">
                  <label htmlFor="Kg">Kg:</label>
                  <input id="Kg" type="number" className={"w-[15%] text-black text-center " + NoInputBar}></input>
                </div>
                <div className="flex flex-col ml-5 justify-center items-center">
                  <label htmlFor="Rpe">Rpe:</label>
                  <input id="Rpe" type="number" className={"w-[15%] text-black text-center " + NoInputBar}></input>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 flex w-full justify-around">
        <button className="text-orange font-bold">Delete</button>
        <button className="text-orange font-bold">Save</button>
      </div>
    </div>
  );
}
