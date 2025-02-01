import React from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";


interface SeriesProps {
  index: number;
  NoInputBar: string;
  setText: React.Dispatch<React.SetStateAction<string[]>>;
  text: string[];
}

const Series: React.FC<SeriesProps> = ({
  index,
  NoInputBar,
  setText,
  text,
}) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [openSeries, setOpenSeries] = useState(false); 
  const [reps, setReps] = useState(0);



  const handleOpenSeries = () => {
    if (reps === 0) {
      toast.error("No hay series que mostrar");
      return;
    }
    setOpenSeries(!openSeries);
  };

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


  const handleOnChangeSeries = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) value = 0;
    if (value > 6) value = 6;
    setOpenSeries(true);
    setReps(value);
  };
  return (
    <div key={index} className="flex flex-col ">
      {isEditing === index ? (
        <div className=" h-auto flex flex- items-center text-white font-extrabold lg:text-2xl text-center cursor-pointer">
          <div className="flex justify-between w-full mt-5">
            <input
              name="nombre_serie"
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
                onChange={(e) => handleOnChangeSeries(e)}
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
            <h1 className="truncate text-[clamp(1rem,5vw,2rem)]  max-w-[50%] lg:max-w-[90%] ">
              {text[index]}
            </h1>
            <div className="flex justify-center items-center gap-5">
              <label htmlFor={`Series-${index}`}>Series:</label>
              <input
                name="series"
                max={6}
                min={0}
                onChange={(e) => handleOnChangeSeries(e)}
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
        <input
          name="reps"
          id="Reps"
          type="number"
          className={classInput}
        ></input>
      </div>
      <div className={classDiv}>
        <label className={classLabel} htmlFor="Kg">
          Kg:
        </label>
        <input name="kg" id="Kg" type="number" className={classInput}></input>
      </div>
      <div className={classDiv}>
        <label className={classLabel} htmlFor="Rpe">
          Rpe:
        </label>
        <input name="rpe" id="Rpe" type="number" className={classInput}></input>
      </div>
    </div>
  );
};
