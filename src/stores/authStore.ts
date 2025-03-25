// src/stores/auth.ts
import { defineStore } from 'pinia';
import { authService } from '@/services/authService';
import router from '@/router';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: any | null;
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

                    const decodedToken: any = jwtDecode(accessToken);
                    const userId = decodedToken.nameid;

                    this.setUser({ id: userId });

                    console.log("Info user:", this.user);
                    console.log("Info user:", this.user);
                    console.log('Token Decodificado:', decodedToken);
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

                    // Decodificar el nuevo token también al refrescar
                    const decodedToken: any = jwtDecode(accessToken);
                    const userId = decodedToken.IdUsuario;
                    this.setUser({ id: userId });

                    return true;
                } else {
                    this.clearAuth();
                    return false;
                }
            } catch (error) {
                console.error('Error refreshing token', error);
                this.clearAuth();
                return false;
            }
        },
        logout() {
            this.clearAuth();
            router.push('/login');
        },
    },
});
