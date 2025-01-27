import React from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useState } from "react";

interface SeriesProps {
  index: number;
  handleOnChangeSeries: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleOpenSeries: () => void;
  openSeries: boolean;
  NoInputBar: string;
  setText: React.Dispatch<React.SetStateAction<string[]>>;
  text: string[];
  reps: number;
}

const Series: React.FC<SeriesProps> = ({
  index,
  handleOnChangeSeries,
  handleOpenSeries,
  openSeries,
  NoInputBar,
  setText,
  text,
  reps,
}) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);

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
  return (
    <div key={index} className="flex flex-col ">
      {isEditing === index ? (
        <div className=" h-auto flex flex- items-center text-white font-extrabold lg:text-2xl text-center cursor-pointer">
          <div className="flex justify-between w-full mt-5">
            <input
              type="text"
              className={`w-[40%] text-center border rounded bg-negro text-white font-extrabold `}
              value={text[index]}
              onChange={(e) => handleOnChangeText(e, index)}
              onBlur={handleOnBlur}
              onKeyDown={handleOnKeyDown}
              autoFocus
            />
            <div className="flex justify-center items-center gap-5">
              <label htmlFor={`Series-${index}`}>Series:</label>
              <input
                max={6}
                min={0}
                onChange={(e) => handleOnChangeSeries(e, index)}
                id={`Series-${index}`}
                type="number"
                className={`text-black text-center w-[10%] ${NoInputBar}`}
              />
              <button>
                <MdExpandMore size={32} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className=" h-auto flex flex-col items-center text-white font-extrabold text-2xl text-center cursor-pointer"
          onDoubleClick={() => handleDoubleClick(index)}
        >
          <div className="flex justify-between w-full mt-5">
            <h1>{text[index]}</h1>
            <div className="flex justify-center items-center gap-5">
              <label htmlFor={`Series-${index}`}>Series:</label>
              <input
                max={6}
                min={0}
                onChange={(e) => handleOnChangeSeries(e, index)}
                id={`Series-${index}`}
                type="number"
                className={`text-black text-center w-[10%] ${NoInputBar}`}
              />
              <button onClick={handleOpenSeries}>
                {openSeries ? (
                  <MdExpandLess size={32} />
                ) : (
                  <MdExpandMore size={32} />
                )}
              </button>
            </div>
          </div>
          {openSeries && reps > 0 && (
            <div>
              <hr className="mt-6 border-2  " />

              {[...Array(reps)].map((_, index) => (
                <div className="mt-5" key={index}>
                  <RepsKgRpe />
                </div>
              ))}
              <hr className="mt-6 border-2  " />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Series;

const RepsKgRpe = () => {
  const NoInputBar =
    "resize-none scrollbar-hide [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
  const classLabel = "text-white font-extrabold text-2xl ";
  const classInput =
    "w-[40%] text-white text-center bg-gray-400 font-extrabold text-2xl focus:bg-white focus:text-black " +
    NoInputBar;
  const classDiv = "flex justify-center items-center gap-5 ";
  return (
    <div className="flex  justify-between ">
      <div className={classDiv}>
        <label className={classLabel} htmlFor="Reps">
          Reps:
        </label>
        <input id="Reps" type="number" className={classInput}></input>
      </div>
      <div className={classDiv}>
        <label className={classLabel} htmlFor="Kg">
          Kg:
        </label>
        <input id="Kg" type="number" className={classInput}></input>
      </div>
      <div className={classDiv}>
        <label className={classLabel} htmlFor="Rpe">
          Rpe:
        </label>
        <input id="Rpe" type="number" className={classInput}></input>
      </div>
    </div>
  );
};
