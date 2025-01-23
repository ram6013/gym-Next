"use client";
import { FaUser, FaCalendar, FaHome } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { FaPersonRunning } from "react-icons/fa6";
import { VscGraph } from "react-icons/vsc";
import { useState } from "react";
import { useRouter } from "next/navigation";


  
export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const iconClass =
    "text-orange transform transition-transform hover:scale-110 m-3 text-xl  lg:text-4xl ";
  return (
    <div className="flex w-auto h-auto bg-negro items-center justify-between ">
      <button
        onClick={() => setShowModal(!showModal)}
        className="lg:ml-10 z-30"
      >
        <FaUser className={iconClass} />
      </button>
      <div className="flex absolute w-full justify-center">
        <h1 className="text-4xl lg:text-5xl text-center font-bold text-orange">
          GYM Notes
        </h1>
      </div>
      <div>
        <Botons classNameDiv="hidden  w-full lg:flex justify-end lg:justify-around gap-10 mr-10 " />
      </div>
      <div className="lg:hidden w-full flex justify-end ">
        <button>
          <CiMenuBurger
            className={iconClass}
            onClick={() => setShowModal(!showModal)}
          />
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-fondo w-full h-screen z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setShowModal(!showModal)}
          >
            <CiMenuBurger className={iconClass} />
          </button>
          <Botons classNameDiv="flex flex-col items-center justify-around space-y-6 z-40" />
        </div>
      )}
    </div>
  );
}

function Botons({ classNameDiv = "" }: { classNameDiv?: string }) {
  const navigate = useRouter();
  const iconClass =
    "text-orange transform transition-transform hover:scale-110 m-3 text-xl  lg:text-4xl ";
  const classButton = "z-30";
  return (
    <div className={classNameDiv}>
      <button className={classButton} onClick={() => navigate.push("/run")}>
        <FaPersonRunning className={iconClass} />
      </button>
      <button
        className={classButton}
        onClick={() => navigate.push("/calendar")}
      >
        <FaCalendar className={iconClass} />
      </button>
      <button className={classButton} onClick={() => navigate.push("/stats")}>
        <VscGraph className={iconClass} />
      </button>
      <button className={classButton} onClick={() => navigate.push("/")}>
        <FaHome className={iconClass} />
      </button>
    </div>
  );
}
