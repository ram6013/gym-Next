export type Rutina = {
    id : number;
    nombre : string;
    id_user : number;
    num_ex : number;
}

export type ejercicio = {
    name: string;
    rutinas_id: number;
    num_series: number;
}

export type Info = {
    ejercicio_id: number;
    kg: number;
    rpe: number;
    reps: number;
    num_sets: number;
}