import { genericRequest } from "@/utils/genericRequest";

const base_url = 'https://localhost:7140/api'

export const getLogsService = async () => {
  return await genericRequest(base_url + '/logErrores', 'GET')
}
