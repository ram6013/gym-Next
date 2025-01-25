
import { Suspense } from "react";
import { getRutinas } from "./actions";
import Ejercicios from "./Componentes/Ejercicios";
import BotonCreate from "./Componentes/BotonMasCrear";
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
        <div >
        <Rutinas />
        </div>
      </Suspense>
    </div>
  );
}

const Rutinas = async () => {
  const response = await getRutinas();
  if (response.error || !response.data) {
    return <></>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center mt-8 ">
      {response.data.map((rutina) => (
        <div
          className="lg:3/4 h-64 mb-16  w-3/4 relative bg-negro border border-gray-900 rounded-xl "
          key={rutina.id}
        >
          <Ejercicios name={rutina.nombre} />
        </div>
      ))}
    </div>
  );
};
