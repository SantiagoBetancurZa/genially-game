import type { ResearchStageId } from '../types/game';

/** Títulos de tarjeta como en el diseño (línea única o dos palabras). */
export const RESEARCH_STAGE_LABELS: Record<ResearchStageId, string> = {
  1: 'DEFINICIÓN DEL PROBLEMA',
  2: 'REVISIÓN DE LITERATURA',
  3: 'PLANTEAMIENTO DE OBJETIVOS',
  4: 'DISEÑO DE LA INVESTIGACIÓN',
  5: 'RECOLECCIÓN DE DATOS',
  6: 'ANÁLISIS DE DATOS',
  7: 'INTERPRETACIÓN DE RESULTADOS',
  8: 'COMUNICACIÓN DE RESULTADOS',
};

export const RESEARCH_STAGE_LIST: { id: ResearchStageId; label: string }[] = [
  1, 2, 3, 4, 5, 6, 7, 8,
].map((id) => ({
  id: id as ResearchStageId,
  label: RESEARCH_STAGE_LABELS[id as ResearchStageId],
}));
