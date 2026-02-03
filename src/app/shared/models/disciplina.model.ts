import { Avaliacao } from "./avaliacao.model";
import { Falta } from "./falta.model";

export interface Disciplina {
  id: number;
  disciplina: string;
  sigla: string;
  instituicao: string;
  professor: string;
  avaliacoes: Avaliacao[];
  formula_media: string;
  media_necessaria: number;
  faltas_permitidas: number;
  aulas_por_dia: number;
  faltas: Falta[];
}
