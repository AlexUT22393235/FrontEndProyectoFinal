// src/interfaces/IProductCreate.ts
export interface IProductCreate {  
    nombre: string;
    descripcion: string;
    procesoNegociacion: boolean;
    intercambio: boolean;
    usuarioId: number;
    categoriasIds: number[];
    imagenes: File[];
  }
  