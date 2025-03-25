import axios from 'axios';

export const getExchanges = async (userId: number) => {
  try {
    const response = await axios.get('https://localhost:7140/api/Intercambio', {
      headers: {
        accept: 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data
        .filter(
          (exchange: any) =>
            exchange.usuarioSolicitanteId === userId || exchange.usuarioOfertanteId === userId
        )
        .map((exchange: any) => ({
          productTitle: exchange.productoId,
          date: exchange.fechaRegistro,
          exchangedProducts: [exchange.productoId],
          description: 'Descripción del intercambio',
          image: 'https://via.placeholder.com/150',
          role: exchange.usuarioSolicitanteId === userId ? 'Solicitante' : 'Ofertante',
        }));
    }
  } catch (error) {
    console.error('Error obteniendo intercambios:', error);
    throw error;
  }
};
