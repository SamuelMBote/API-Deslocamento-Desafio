import {ICondutor} from '@/interfaces/ICondutor';
export default function tratamentoCondutor(obj: ICondutor[]): ICondutor[];
export default function tratamentoCondutor(obj: ICondutor): ICondutor;
export default function tratamentoCondutor(
  obj: ICondutor | ICondutor[],
): ICondutor | ICondutor[] {
  if (obj && Array.isArray(obj)) {
    return obj.map((item) => {
      const vencimentoHabilitacao = new Date(item.vencimentoHabilitacao);

      let categoriaHabilitacao = '';
      if (
        'catergoriaHabilitacao' in item &&
        typeof item.catergoriaHabilitacao === 'string'
      ) {
        categoriaHabilitacao = item.catergoriaHabilitacao;
      }
      return {...item, vencimentoHabilitacao, categoriaHabilitacao};
    });
  } else {
    let categoriaHabilitacao = '';
    if (
      'catergoriaHabilitacao' in obj &&
      typeof obj.catergoriaHabilitacao === 'string'
    ) {
      categoriaHabilitacao = obj.catergoriaHabilitacao;
    }
    const vencimentoHabilitacao = new Date(obj.vencimentoHabilitacao);
    return {...obj, vencimentoHabilitacao, categoriaHabilitacao};
  }
}
