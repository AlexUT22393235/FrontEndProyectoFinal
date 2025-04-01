export interface ProductPatchDTO {
    IdProducto: number;
    Nombre?: string;
    Descripcion?: string;
    Intercambio?: boolean;
    CategoriasIds: number[];
    Imagenes?: File[];
  }