export interface IVeiculo {
  id?: number;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}
export function isVeiculo(obj: unknown): obj is IVeiculo {
  if (
    obj &&
    typeof obj === 'object' &&
    'placa' in obj &&
    'marcaModelo' in obj &&
    'anoFabricacao' in obj &&
    'kmAtual' in obj
  ) {
    return true;
  } else {
    return false;
  }
}
