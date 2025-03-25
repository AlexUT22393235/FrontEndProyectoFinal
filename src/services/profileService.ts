import { genericRequest } from "@/utils/genericRequest";
import { useAuthStore } from "@/stores/authStore";

const BASE_URL = "https://localhost:7140/api";

export const getUserProfileService = async () => {
  try {
    const authStore = useAuthStore();
    const userId = authStore.user?.id; 

    if (!userId) {
      console.error(" No se encontró el ID del usuario en el token.");
      return null;
    }


    const profiles = await genericRequest(`${BASE_URL}/Perfil`, "GET");

    if (!profiles || !Array.isArray(profiles)) {
      console.error(" Respuesta inesperada de la API de perfiles:", profiles);
      return null;
    }


    const userProfile = profiles.find((p: any) => Number(p.usuarioId) === Number(userId));

    console.log(" Perfil encontrado:", userProfile);

    return userProfile ?? null;
  } catch (error) {
    console.error(" Error obteniendo el perfil del usuario:", error);
    return null;
  }
};
