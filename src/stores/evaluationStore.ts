import { defineStore } from 'pinia';
import type { IEvaluation } from '../interfaces/IEvaluation';
import { getEvaluationsService, deleteEvaluationService } from '../services/evaluationService'; 

export const useEvaluationStore = defineStore('evaluation', {
  state: () => ({
    evaluations: [] as IEvaluation[],
  }),
  actions: {
    async fetchEvaluations() {
      try {
        const evaluations = await getEvaluationsService();
        this.evaluations = evaluations;
      } catch (error) {
        console.error('Error al obtener evaluaciones', error);
      }
    },
    async deleteEvaluation(evaluationId: number) {
        try {
          await deleteEvaluationService(evaluationId);
          this.evaluations = this.evaluations.filter(evaluation => evaluation.idEvaluacion !== evaluationId);
        } catch (error) {
          console.error('Error al eliminar la evaluación:', error);
          throw error;
        }
      },
  },
});