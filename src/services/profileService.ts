import { genericRequest, genericRequestStatusNeeded } from "@/utils/genericRequest";
import { useAuthStore } from "@/stores/authStore";

const base_url = "https://localhost:7140/api";

export const getUserProfileService = async () => {
  try {
    const authStore = useAuthStore();
    console.log("Usuario en authStore:", authStore.user);

    const userId = authStore.user?.id;

    if (!userId) {
      console.error("No se encontró el ID del usuario en el token.");
      return null;
    }

    const response = await genericRequest(`${base_url}/Perfil`, "GET");
    console.log("Respuesta de la API:", response);

    const profiles = response?.data ?? [];

    if (!Array.isArray(profiles)) {
      console.error("Respuesta inesperada de la API de perfiles:", profiles);
      return null;
    }

    const userProfile = profiles.find((p: any) => Number(p.usuarioId) === Number(userId));

    console.log("Perfil encontrado:", userProfile);

    return userProfile ?? null;
  } catch (error) {
    console.error("Error obteniendo el perfil del usuario:", error);
    return null;
  }
};

export const getProfilesService = async () => {
  return await genericRequest(base_url + '/perfil/', 'GET')
}

export const getProfileService = async (id:number) => {
  return await genericRequestStatusNeeded(base_url + '/perfil/usuario' + id, 'GET')
}
