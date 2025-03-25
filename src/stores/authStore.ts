// src/stores/auth.ts
import { defineStore } from 'pinia';
import { authService } from '@/services/authService';
import { useRouter } from 'vue-router'; // Importa el router si necesitas redirigir

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null; // Puedes tipar esto mejor si tienes la información del usuario
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),
  actions: {
    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
    setUser(user: any) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearAuth() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    isLoggedIn(): boolean {
      return !!this.accessToken;
    },
    async login(correoElectronio: string, contrasenia: string) {
      try {
        const response = await authService.login(correoElectronio, contrasenia);
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;
          this.setTokens(accessToken, refreshToken);

          return true;
        }
        return false;
      } catch (error: any) {
        console.error('Error during login', error);
        throw error; 
      }
    },
    async attemptRefresh() {
      if (!this.refreshToken) {
        this.clearAuth();
        return false;
      }

      try {
        const response = await authService.refreshToken(this.refreshToken);
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;
          this.setTokens(accessToken, refreshToken);
          return true;
        } else {
          this.clearAuth();
          return false;
        }
      } catch (error: any) {
        console.error('Error refreshing token', error);
        this.clearAuth();
        return false;
      }
    },
    logout() {
      this.clearAuth();
      const router = useRouter();
      router.push('/login');
    },
  },
});