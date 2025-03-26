// interfaces/IProductDetail.ts
export interface IProductDetail {
    idImagen: number;
    nombre: string;
    descripcion: string;
    urlImagen: string;
    imagenes?: { idImagen: number; urlImagen: string }[];
    usuarioId?: number; // Opcional para futuro
  }

  // 22393139