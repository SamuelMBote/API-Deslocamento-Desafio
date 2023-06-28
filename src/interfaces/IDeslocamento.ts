export interface IDeslocamento {
  id?: number;
  kmInicial: number;
  kmFinal: number;
  inicioDeslocamento: string | Date;
  fimDeslocamento: string | Date;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}
export function isDeslocamento(obj: unknown): obj is IDeslocamento {
  if (
    obj &&
    typeof obj === 'object' &&
    'kmInicial' in obj &&
    'kmFinal' in obj &&
    'motivo' in obj
  ) {
    return true;
  } else {
    return false;
  }
}
