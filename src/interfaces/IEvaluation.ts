export interface IEvaluation {
    idEvaluacion: number;
    tituloEvaluacion?: string;
    usuarioId: number;
    usuarioEvaluadorId: number;
    productoId: number;
    fechaCreacion: string;
    comentario?: string;
    puntuacion?: number;
    nombreUsuario: string;
    nombreUsuarioEvaluador: string;
    nombreProducto: string;
  }