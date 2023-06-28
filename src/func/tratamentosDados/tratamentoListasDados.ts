import {isCliente} from '@/interfaces/ICliente';

import {isCondutor} from '@/interfaces/ICondutor';
import {isDeslocamento} from '@/interfaces/IDeslocamento';
import {isVeiculo} from '@/interfaces/IVeiculo';
import {DataArrays} from '@/interfaces/TDataArray';
import tratamentoCliente from './tratamentoCliente';
import tratamentoCondutor from './tratamentoCondutor';
import tratamentoDeslocamento from './tratamentoDeslocamento';
import tratamentoVeiculo from './tratamentoVeiculo';

export default function tratamentoListaDados(dados: DataArrays): DataArrays {
  if (dados.map(isCliente).every((item) => item === true)) {
    return dados.map((item) => {
      if (isCliente(item)) {
        return tratamentoCliente(item);
      } else {
        return item;
      }
    });
  }
  if (dados.map(isCondutor).every((item) => item === true)) {
    return dados.map((item) => {
      if (isCondutor(item)) {
        return tratamentoCondutor(item);
      } else {
        return item;
      }
    });
  }
  if (dados.map(isDeslocamento).every((item) => item === true)) {
    return dados.map((item) => {
      if (isDeslocamento(item)) {
        return tratamentoDeslocamento(item);
      } else {
        return item;
      }
    });
  }
  if (dados.map(isVeiculo).every((item) => item === true)) {
    return dados.map((item) => {
      if (isVeiculo(item)) {
        return tratamentoVeiculo(item);
      } else {
        return item;
      }
    });
  } else {
    return dados;
  }
}
