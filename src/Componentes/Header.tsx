"use client";
import { FaUser, FaCalendar, FaHome } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { FaPersonRunning } from "react-icons/fa6";
import { VscGraph } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import LogOut from "./LogOut";
import { useOutsideClick } from "@/app/Hooks/useOutsideClick";
export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [hasIdCookie, setHasIdCookie] = useState(false);
  const [showLogaut, setShowLogout] = useState(false);
  const iconClass =
    "text-orange transform transition-transform hover:scale-110 m-3 text-3xl  lg:text-4xl ";
  const path = usePathname();

   const containerRef = useRef(null);
    useOutsideClick(containerRef, () => setShowLogout(false));
  useEffect(() => {
    const cookies = document.cookie;
    const hasId = cookies.includes("id="); 
    setHasIdCookie(hasId);
  }, []);
  
  if (path === "/" || !hasIdCookie) {
    return <div className="absolute w-full h-screen flex items-center justify-center"><h1 className="text-4xl lg:text-5xl text-center font-bold text-orange">💀 No has iniciado sesión 💀</h1></div>;
  }
  const pages = ["/Home", "/run", "/calendar", "/stats"];
  if (pages.includes(path)) {
    return (
      <div ref={containerRef} className="flex w-auto lg:h-auto min-h-20 bg-negro items-center justify-between ">
        <button className="lg:ml-10 z-30" >
          <FaUser className={iconClass} onClick={() => setShowLogout(!showLogaut)}/>
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
          <button onClick={() => setShowModal(!showModal)}>
            <CiMenuBurger className={iconClass} />
          </button>
        </div>
        {showLogaut && (
          <LogOut setShowLogOut={setShowLogout}/>
        )}
        {showModal && (
          <div className=" fixed inset-0 bg-fondo w-full h-screen z-50 flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setShowModal(!showModal)}
            >
              <IoMdClose className={iconClass} size={50} />
            </button>

            <div className="flex flex-col items-center justify-around space-y-6 z-40"></div>
            <Botons
              classNameDiv="flex w-full flex-col items-center justify-around space-y-6 z-40"
              classNameBoton="text-white text-center border-2 border-orange flex items-center justify-center rounded-lg p-2 w-1/2"
            />
          </div>
        )}
      </div>
    );
  }
}

function Botons({
  classNameDiv = "",
  classNameBoton = "z-30",
}: {
  classNameDiv?: string;
  classNameBoton?: string;
}) {
  const navigate = useRouter();
  const iconClass =
    "text-orange transform transition-transform hover:scale-110 m-3 text-xl  lg:text-4xl ";
  return (
    <div className={classNameDiv}>
      <button className={classNameBoton} onClick={() => navigate.push("/run")}>
        <FaPersonRunning className={iconClass} />
        <H1 text="Running" />
      </button>
      <button
        className={classNameBoton}
        onClick={() => navigate.push("/calendar")}
      >
        <FaCalendar className={iconClass} /> <H1 text="Calendar" />
      </button>
      <button
        className={classNameBoton}
        onClick={() => navigate.push("/stats")}
      >
        <VscGraph className={iconClass} /> <H1 text="Stats" />
      </button>
      <button className={classNameBoton} onClick={() => navigate.push("/")}>
        <FaHome className={iconClass} /> <H1 text="Home" />
      </button>
    </div>
  );
}

function H1({ text }: { text: string }) {
  return <h1 className="lg:hidden text-2xl font-bold">{text}</h1>;
}

