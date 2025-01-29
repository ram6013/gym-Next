import { Suspense } from "react";
import { getRutinas } from "../actions";
import Ejercicios from "@/Componentes/Ejercicios";
import BotonCreate from "@/Componentes/BotonMasCrear";
import { cookies } from "next/headers";
export default function Page() {
  return (
    <div>
      <BotonCreate />
      <Suspense
        fallback={
          <div className="flex justify-center w-full items-center">
            <h1 className="text-white font-bold text-4xl">Loading...</h1>{" "}
          </div>
        }
      >
        <div>
          <Rutinas />
        </div>
      </Suspense>
    </div>
  );
}

const Rutinas = async () => {
  const id = (await cookies()).get("id")?.value;
  const userId = parseInt(id || "0");
  console.log("esto es : ", userId, id);
  const response = await getRutinas({ userId });
  if (response.error || !response.data) {
    return <></>;
  }
  return (
    <div className="grid grid-cols-1 h-auto justify-items-center mt-3 lg:mt-8 lg:block">
      {response.data.map((rutina) => (
        <div
          className="h-auto min-h-96 mb-16 w-[95%] lg:w-3/4 relative bg-negro border border-gray-900 rounded-xl "
          key={rutina.id}
        >
          <Ejercicios name={rutina.nombre} id={rutina.id} userId={userId} />
        </div>
      ))}
    </div>
  );
};
