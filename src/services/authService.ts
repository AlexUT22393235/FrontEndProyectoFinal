// src/services/authService.ts
import axios from 'axios';

const API_URL = 'https://localhost:7140/api/Auth'; // Ajusta la URL base

class AuthService {
  async login(correoElectronico: string, contrasenia: string) {
    return axios.post(`${API_URL}/Login`, { correoElectronico, contrasenia });
  }

  async refreshToken(refreshToken: string) {
    return axios.post(`${API_URL}/RefreshToken`, { refreshToken });
  }
}

export const authService = new AuthService();
