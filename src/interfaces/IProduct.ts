import type { ICategory } from "./ICategory";

export interface IProduct {
  idProducto: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: Date;
  procesoNegociacion: boolean;
  intercambio: boolean;
  usuarioId: number;
  imagenes: {
    idImagen: number;
    urlImagen: string;
  }[];
  categorias: ICategory[];
}
