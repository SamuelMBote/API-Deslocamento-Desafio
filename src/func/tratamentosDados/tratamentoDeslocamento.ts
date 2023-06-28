import {IDeslocamento} from '@/interfaces/IDeslocamento';

export default function tratamentoDeslocamento(
  obj: IDeslocamento[],
): IDeslocamento[];
export default function tratamentoDeslocamento(
  obj: IDeslocamento,
): IDeslocamento;
export default function tratamentoDeslocamento(
  obj: IDeslocamento | IDeslocamento[],
): IDeslocamento | IDeslocamento[] {
  if (obj && Array.isArray(obj)) {
    return obj.map((item) => {
      const inicioDeslocamento = new Date(item.inicioDeslocamento);
      const fimDeslocamento = new Date(item.fimDeslocamento);
      return {
        ...item,
        inicioDeslocamento,
        fimDeslocamento,
      };
    });
  } else {
    const inicioDeslocamento = new Date(obj.inicioDeslocamento);
    const fimDeslocamento = new Date(obj.fimDeslocamento);
    return {
      ...obj,
      inicioDeslocamento,
      fimDeslocamento,
    };
  }
}
