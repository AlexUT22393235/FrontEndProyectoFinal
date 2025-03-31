import { genericRequest } from "@/utils/genericRequest";
const base_url = 'https://localhost:7140/api' 

export const getEvaluationsService = async () => {
  return await genericRequest(base_url + '/Evaluacion', 'GET')
};

export const deleteEvaluationService= async(id:number)=>{
    return await genericRequest(base_url+`/Evaluacion/${id}`,'DELETE')
}
