export interface IExchange {
    fechaRegistro: string;
    usuarioOfertanteId: number;
  }
  
  export interface IExchangeOffer {
    productoId: number;
  }
  // 22393139 FGT 26/03/2025
  export interface IProductDetail {
    nombre: string;
    descripcion: string;
    imagenes: IImage[];
    fechaRegistro?: string;
  }
  
  // 22393139 FGT 26/03/2025
  export interface IImage {
    idImagen: number;
    urlImagen: string;
  }
  