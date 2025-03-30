// interfaces/IExchange.ts
export interface IExchange {
    id: number;
    fechaRegistro: string;
    usuarioOfertanteId: number;
    productoId: number;
    estado: string;
  }
  
  export interface IExchangeOffer {
    id: number;
    productoId: number;
    usuarioOfertanteId: number;
    fechaOferta: string;
    estado: string;
  }
  
  export interface IProductDetail {
    id: number;
    nombre: string;
    descripcion: string;
    imagenes: IImage[];
    fechaRegistro?: string;
  }
  
  export interface IImage {
    idImagen: number;
    urlImagen: string;
    productoId: number;
  }