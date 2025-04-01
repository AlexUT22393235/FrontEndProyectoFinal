export interface ProductPartialUpdateDTO {
    idProducto: number;
    nombre?: string;
    descripcion?: string;
    intercambio?: boolean;
    categoriasIds: number[];
    imagenes: { urlImagen: string }[];
}