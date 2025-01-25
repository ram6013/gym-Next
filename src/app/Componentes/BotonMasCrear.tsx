"use client";
import React, { useRef, useState } from "react";
import { createRutina } from "../actions";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useOutsideClick } from "../Hooks/useOutsideClick";
export default function BotonCreate() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShowModal(!showModal)}
        className="text-orange text-4xl ml-5 mt-5 "
      >
        <FaRegSquarePlus />
      </button>
      {showModal && <Create setShowModal={setShowModal} />}
    </div>
  );
}

function Create({
  setShowModal,
}: {
  setShowModal: (show: React.SetStateAction<boolean>) => void;
}) {
  const [rutina, setRutina] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRutina(event.target.value);
  };

  
  const containerRef = useRef(null);
  useOutsideClick(containerRef, () => setShowModal(false));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const Rutina = { nombre: rutina };
    createRutina(Rutina);
    event.preventDefault();
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div  className="fixed inset-0 bg-fondo w-full h-screen bg-opacity-60 z-50 flex items-center justify-center">
      <div ref={containerRef} className=" bg-negro border border-gray-900 rounded-xl p-5">
        <form onSubmit={handleSubmit}>
          <div className="flex-col justify-center items-center">
            <label htmlFor="rutina" className="text-white text-4xl text-center font-extrabold ">
              Nombre:
            </label>
            <input
              type="text"
              id="rutina"
              value={rutina}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-500 rounded mb-4 font-extrabold"
            />
          </div>
          <div className="flex justify-around ">
            <button type="submit" className="text-orange text-4xl  font-extrabold">
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="text-orange text-4xl font-extrabold"
            >
              Exit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
