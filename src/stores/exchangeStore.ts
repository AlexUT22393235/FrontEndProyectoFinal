import { defineStore } from 'pinia';
import { getExchangesByUserIdService, getOfferByUserIdService, getProductDetailByIdService } from '../services/historyService';
import type { IExchange, IExchangeOffer, IProductDetail } from '@/interfaces/IExchange';

export const useExchangeStore = defineStore('exchangeStore', {
  state: () => ({
    exchanges: [] as IProductDetail[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchExchangeHistory(userId: number) {
      this.loading = true;
      this.error = null;

      try {
        // Obtener intercambios 22393139 FGT 26/03/2025
        const exchangeData: IExchange[] = await getExchangesByUserIdService(userId);

        const productDetailsPromises = exchangeData.map(async (exchange) => {
          // Obtener ofertas del usuario ofertante 22393139 FGT 26/03/2025
          const offerData: IExchangeOffer[] = await getOfferByUserIdService(exchange.usuarioOfertanteId);

          if (offerData.length === 0) {
            throw new Error('No se encontraron productos para el ofertante.');
          }

          // Obtener detalles del producto 22393139 FGT 26/03/2025
          const productDetail = await getProductDetailByIdService(offerData[0].productoId);

          return {
            ...productDetail,
            fechaRegistro: exchange.fechaRegistro,
          };
        });

        // Esperar a que todas las promesas se resuelvan 22393139 FGT 26/03/2025
        this.exchanges = await Promise.all(productDetailsPromises);
      } catch (err: any) {
        this.error = err.message || 'Error al obtener el historial de intercambio.';
      } finally {
        this.loading = false;
      }
    },
  },
});
