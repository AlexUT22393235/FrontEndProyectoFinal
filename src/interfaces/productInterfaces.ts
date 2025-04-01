// Interfaz para la respuesta de imágenes
export interface ImagenDTO {
    idImagen?: number;
    urlImagen: string;
  }
  
  // Interfaz para el DTO de actualización parcial
  export interface ProductPatchDTO {
    IdProducto: number;
    Nombre?: string;
    Descripcion?: string;
    Intercambio?: boolean;
    CategoriasIds: number[];
    Imagenes?: File[]; // Para enviar al backend
  }
  
  // Interfaz para el producto actualizado (respuesta)
  export interface UpdatedProductResponse {
    idProducto: number;
    nombre: string;
    descripcion: string;
    intercambio: boolean;
    categoriasIds: number[];
    imagenes: ImagenDTO[];
  }
  
  // Interfaz para el estado del store
  export interface ProductUpdateState {
    updatedProduct: UpdatedProductResponse | null;
    loading: boolean;
    error: string | null;
  }