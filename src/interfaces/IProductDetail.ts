// interfaces/IProductDetail.ts
export interface IProductDetail {
    idProducto:number;
    idImagen: number;
    nombre: string;
    descripcion: string;
    fechaCreacion: Date;
    urlImagen: string;
    imagenes?: { idImagen: number; urlImagen: string }[];
    usuarioId?: number; // Opcional para futuro
  }
//Removí 
  // 22393139
