"use client";
import React, { useEffect, useRef, useState } from "react";
import { createRutina } from "@/app/actions";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useOutsideClick } from "@/app/Hooks/useOutsideClick";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUserId } from "@/app/Context/UserContext";

export default function BotonCreate() {
  const [showModal, setShowModal] = useState(false);
  const [hasIdCookie, setHasIdCookie] = useState(false);
  useEffect(() => {
    const cookies = document.cookie;
    const hasId = cookies.includes("id=");
    setHasIdCookie(hasId);
  }, []);
  if (!hasIdCookie) {
    return <></>;
  }
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
  const userId = useUserId();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRutina(event.target.value);
  };

  
  const containerRef = useRef(null);
  useOutsideClick(containerRef, () => setShowModal(false));

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Rutina = { nombre: rutina, id_user: userId.userId ?? undefined };
    const response = await createRutina(Rutina);
    if (response.error) {
      toast.error("Error al crear rutina");
      console.log(response.error);
    }
    else{
      toast.success("Rutina creada");
    }
    
    setShowModal(false);
    router.refresh();
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
