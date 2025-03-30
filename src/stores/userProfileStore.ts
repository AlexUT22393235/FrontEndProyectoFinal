// stores/userProfileStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import type { UserProfile } from '@/interfaces/IUserProfile';
import { getProfileService } from '@/services/profileService';

export const useUserProfileStore = defineStore('userProfile', {
  state: () => ({
    userProfile: null as UserProfile | null, // Usa la interfaz aquí
  }),
  actions: {
    async fetchUserData(profileId: number) {
      try {
        const response = await getProfileService(profileId);
        console.log('Datos obtenidos de la API de perfil:', response.data[0]);

        if (response.status === 200) {
          const profile = response.data[0];

          if (profile) {
            this.userProfile = {
              idPerfil: profile.idPerfil,
              usuarioId: Number(profile.usuarioId),
              imagenPerfil: profile.imagenPerfil,
              nombrePerfil: profile.nombrePerfil,
              descripcion: profile.descripcion,
            };
          } else {
            this.userProfile = null;
          }
        }
      } catch {
        this.userProfile = null;
      }
    },
  },
});