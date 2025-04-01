import type { postEvaluationDto } from "@/dtos/postEvaluationDto";
import type { postTrade } from "@/dtos/postTradeDto";
import { genericRequest } from "@/utils/genericRequest";
const base_url = 'https://localhost:7140/api'

export const getEvaluationsService = async () => {
  return await genericRequest(base_url + '/Evaluacion', 'GET')
};

export const getEvaluationsSolicitantService = async (id:number) => {
  return await genericRequest(base_url + `/Intercambio/solicitante/${id}`, 'GET')
};

export const getEvaluationsOfertanteService = async (id:number) => {
  return await genericRequest(base_url + `/Intercambio/ofertante/${id}`, 'GET')
};

export const postEvaluationsService = async (item:postEvaluationDto) => {
  return await genericRequest(base_url + '/Evaluacion', 'POST', item)
};

export const deleteEvaluationService= async(id:number)=>{
    return await genericRequest(base_url+`/Evaluacion/${id}`,'DELETE')
}

export const putTradeService = async (id:number, item:postTrade) => {
  return await genericRequest(base_url + '/Intercambio/' + id, 'PUT', item)
};
