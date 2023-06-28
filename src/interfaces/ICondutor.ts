export interface ICondutor {
  id?: number;
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string | null;
  vencimentoHabilitacao: string | Date;
}
export function isCondutor(obj: unknown): obj is ICondutor {
  if (
    obj &&
    typeof obj === 'object' &&
    'nome' in obj &&
    'numeroHabilitacao' in obj
  ) {
    return true;
  } else {
    return false;
  }
}
