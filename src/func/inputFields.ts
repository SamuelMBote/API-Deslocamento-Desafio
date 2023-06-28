import {ICliente, isCliente} from '@/interfaces/ICliente';
import {ICondutor, isCondutor} from '@/interfaces/ICondutor';
import {IDeslocamento, isDeslocamento} from '@/interfaces/IDeslocamento';
import {IVeiculo, isVeiculo} from '@/interfaces/IVeiculo';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
function formataNumberDate(value: Date): string;
function formataNumberDate(value: number): string;
function formataNumberDate(value: number | Date): string {
  if (typeof value === 'number') {
    return value.toLocaleString('pt-BR');
  } else if (value instanceof Date) {
    return format(value, 'dd/MMMM/yyyy', {locale: ptBR});
  }
  return value;
}
interface Column {
  id: string;
  label: string;
  gridColumn?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  align?: 'right';
  format?: Function;
}

export default function inputFields(
  dados: ICliente | ICondutor | IDeslocamento | IVeiculo,
  rota: string,
): Column[] {
  if (dados && typeof dados === 'object') {
    if (isCliente(dados)) {
      return [
        {id: 'id', label: 'ID', format: formataNumberDate, gridColumn: 1},
        {id: 'nome', label: 'Nome', format: formataNumberDate, gridColumn: 11},
        {
          id: 'tipoDocumento',
          label: 'Tipo Documento',
          format: formataNumberDate,
          gridColumn: 6,
        },
        {
          id: 'numeroDocumento',
          label: 'Numero Documento',
          format: formataNumberDate,
          gridColumn: 6,
        },

        {
          id: 'logradouro',
          label: 'Logradouro',
          format: formataNumberDate,
          gridColumn: 8,
        },
        {
          id: 'numero',
          label: 'Número',
          format: formataNumberDate,
          gridColumn: 4,
        },
        {
          id: 'bairro',
          label: 'Bairro',
          format: formataNumberDate,
          gridColumn: 4,
        },
        {
          id: 'cidade',
          label: 'Cidade',
          format: formataNumberDate,
          gridColumn: 4,
        },
        {id: 'uf', label: 'UF', format: formataNumberDate, gridColumn: 4},
      ];
    } else if (isCondutor(dados)) {
      return [
        {id: 'id', label: 'ID', format: formataNumberDate, gridColumn: 1},
        {id: 'nome', label: 'Nome', format: formataNumberDate, gridColumn: 11},
        {
          id: 'numeroHabilitacao',
          label: 'Número Habilitação',
          format: formataNumberDate,
          gridColumn: 4,
        },
        {
          id: 'categoriaHabilitacao',
          label: 'Categoria Habilitação',
          format: formataNumberDate,
          gridColumn: 4,
        },
        {
          id: 'vencimentoHabilitacao',
          label: 'Vencimento Habilitação',
          format: formataNumberDate,
          gridColumn: 4,
        },
      ];
    } else if (isDeslocamento(dados)) {
      return [
        {id: 'id', label: 'ID', format: formataNumberDate, gridColumn: 1},
        {
          id: 'kmInicial',
          label: 'Km Inicial',
          format: formataNumberDate,
          gridColumn: 5,
        },
        {
          id: 'kmFinal',
          label: 'Km Inicial',
          format: formataNumberDate,
          gridColumn: 6,
        },
        {
          id: 'inicioDeslocamento',
          label: 'Início do Deslocamento',
          format: formataNumberDate,
          gridColumn: 6,
        },
        {
          id: 'fimDeslocamento',
          label: 'Fim do Deslocamento',
          format: formataNumberDate,
          gridColumn: 6,
        },
        {
          id: 'checkList',
          label: 'CheckList',
          format: formataNumberDate,
          gridColumn: 4,
        },
        {
          id: 'motivo',
          label: 'Motivo',
          format: formataNumberDate,
          gridColumn: 4,
        },
        {
          id: 'observacao',
          label: 'Observacao',
          format: formataNumberDate,
          gridColumn: 4,
        },
      ];
    } else if (isVeiculo(dados)) {
      return [
        {id: 'id', label: 'ID', format: formataNumberDate, gridColumn: 1},
        {
          id: 'placa',
          label: 'Placa',
          format: formataNumberDate,
          gridColumn: 2,
        },
        {
          id: 'marcaModelo',
          label: 'Marca/Modelo',
          format: formataNumberDate,
          gridColumn: 3,
        },
        {
          id: 'anoFabricacao',
          label: 'Ano de Fabricacao',
          format: formataNumberDate,
          gridColumn: 3,
        },
        {
          id: 'kmAtual',
          label: 'Km Atual',
          format: formataNumberDate,
          gridColumn: 3,
        },
      ];
    } else {
      return [{id: 'null', label: `Ainda não há ${rota} cadastrados`}];
    }
  } else {
    return [{id: 'null', label: `Ainda não há ${rota} cadastrados`}];
  }
}
