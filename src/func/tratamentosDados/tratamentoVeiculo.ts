import {IVeiculo} from '@/interfaces/IVeiculo';

export default function tratamentoVeiculo(obj: IVeiculo[]): IVeiculo[];
export default function tratamentoVeiculo(obj: IVeiculo): IVeiculo;
export default function tratamentoVeiculo(
  obj: IVeiculo | IVeiculo[],
): IVeiculo | IVeiculo[] {
  if (obj && Array.isArray(obj)) {
    return obj.map((item) => {
      const anoFabricacao = new Date(item.anoFabricacao).getFullYear();
      return {...item, anoFabricacao};
    });
  } else {
    const anoFabricacao = new Date(obj.anoFabricacao).getFullYear();
    return {...obj, anoFabricacao};
  }
}
