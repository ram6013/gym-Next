import { Suspense } from "react";
import { getRutinas } from "./actions";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Rutinas />
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
    <div className="flex justify-around mt-8 h-screen max-h-screen">
      {response.data.map((rutina) => (
        <div
          className=" relative w-1/4 h-1/4  bg-negro border border-gray-900 rounded-xl"
          key={rutina.id}
        >
          <div className="absolute top-2 w-full ">
            <h1 className="text-center text-orange font-bold text-4xl">{rutina.nombre}</h1>
          </div>
          <div className="absolute top-2 flex justify-end w-full">
            <input type="number" placeholder="Nº Ex" className="w-[10%]  border border-gray-500 mr-5" max={20} min={1}/>
          </div>
          <div className="absolute bottom-2 flex w-full justify-around">
            <button className="text-orange font-bold">Delete</button>
            <button className="text-orange font-bold">Save</button>
          </div>
        </div>
      ))}
    </div>
  );
};
