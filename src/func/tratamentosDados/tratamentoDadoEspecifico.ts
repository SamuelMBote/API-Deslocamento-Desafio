import {ICliente, isCliente} from '@/interfaces/ICliente';

import {ICondutor, isCondutor} from '@/interfaces/ICondutor';
import {IDeslocamento, isDeslocamento} from '@/interfaces/IDeslocamento';
import {IVeiculo, isVeiculo} from '@/interfaces/IVeiculo';
import {DataArrays} from '@/interfaces/TDataArray';
import tratamentoCliente from './tratamentoCliente';
import tratamentoCondutor from './tratamentoCondutor';
import tratamentoDeslocamento from './tratamentoDeslocamento';
import tratamentoVeiculo from './tratamentoVeiculo';

export default function tratamentoDadosEspecificos(
  dados: ICliente | IDeslocamento | ICondutor | IVeiculo,
): ICliente | IDeslocamento | ICondutor | IVeiculo {
  if (dados && typeof dados === 'object') {
    if (isCliente(dados)) {
      return tratamentoCliente(dados);
    } else if (isCondutor(dados)) {
      return tratamentoCondutor(dados);
    } else if (isDeslocamento(dados)) {
      return tratamentoDeslocamento(dados);
    } else if (isVeiculo(dados)) {
      return tratamentoVeiculo(dados);
    } else return dados;
    dados;
  } else {
    return dados;
  }
}
