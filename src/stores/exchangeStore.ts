import { defineStore } from 'pinia';
import { getExchangesByUserIdService, getOfferByUserIdService, getProductDetailByIdService } from '../services/historyService';
import type { IExchange, IExchangeOffer, IProductDetail } from '@/interfaces/IExchange';

interface ExchangeHistoryItem {
    nombre: string;
    descripcion: string;
    fechaRegistro: string;
    imagenes: { urlImagen: string }[];
  }

export const useExchangeStore = defineStore('exchange', {
  state: () => ({
    exchanges: [] as ExchangeHistoryItem[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchExchangeHistory(userId: number) {
      this.loading = true;
      this.error = null;
      try {
        // Obtener intercambios donde el usuario es el dueño
        const exchangesAsOwner: IExchange[] = await getExchangesByUserIdService(userId);
        
        // Obtener intercambios donde el usuario es el ofertante
        const exchangesAsOfferer: IExchangeOffer[] = await getOfferByUserIdService(userId);

        // Procesar intercambios como dueño
        const ownerPromises = exchangesAsOwner.map(async (exchange) => {
          const productDetail = await getProductDetailByIdService(exchange.productoId);
          return this._mapToHistoryItem(exchange.fechaRegistro, productDetail);
        });

        // Procesar intercambios como ofertante
        const offererPromises = exchangesAsOfferer.map(async (offer) => {
          const productDetail = await getProductDetailByIdService(offer.productoId);
          return this._mapToHistoryItem(new Date().toISOString(), productDetail); // Fecha actual si no hay disponible
        });

        const ownerResults = await Promise.all(ownerPromises);
        const offererResults = await Promise.all(offererPromises);

        this.exchanges = [...ownerResults, ...offererResults];
      } catch (error: any) {
        this.error = error.message || 'Error al cargar el historial';
        console.error('Error en fetchExchangeHistory:', error);
      } finally {
        this.loading = false;
      }
    },

    _mapToHistoryItem(fechaRegistro: string, productDetail: IProductDetail): ExchangeHistoryItem {
        return {
          nombre: productDetail.nombre || 'Producto sin nombre',
          descripcion: productDetail.descripcion || 'Sin descripción disponible',
          fechaRegistro,
          imagenes: productDetail.imagenes || [{ urlImagen: 'https://via.placeholder.com/150' }]
        };
      }
    }
  });