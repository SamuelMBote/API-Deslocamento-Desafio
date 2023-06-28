export interface ICliente {
  id?: number;
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}
export function isCliente(obj: unknown): obj is ICliente {
  if (obj && typeof obj === 'object' && 'nome' in obj && 'logradouro' in obj) {
    return true;
  } else {
    return false;
  }
}
