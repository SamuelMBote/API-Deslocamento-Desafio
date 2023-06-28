import {ICliente, isCliente} from '@/interfaces/ICliente';
import {ICondutor, isCondutor} from '@/interfaces/ICondutor';
import {IDeslocamento, isDeslocamento} from '@/interfaces/IDeslocamento';
import {IVeiculo, isVeiculo} from '@/interfaces/IVeiculo';
import {DataArrays} from '@/interfaces/TDataArray';
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
  minWidth?: number;
  align?: 'right';
  format?: Function;
}

export default function columns(
  dados: DataArrays | ICliente | ICondutor | IDeslocamento | IVeiculo,
  rota: string,
): Column[] {
  if (dados && Array.isArray(dados) && dados.length) {
    const clienteList = dados.map(isCliente).every((item) => item === true);
    const condutorList = dados.map(isCondutor).every((item) => item === true);
    const deslocamentoList = dados
      .map(isDeslocamento)
      .every((item) => item === true);
    const veiculoList = dados.map(isVeiculo).every((item) => item === true);

    if (clienteList) {
      return [
        {id: 'nome', label: 'Nome', format: formataNumberDate},
        {
          id: 'tipoDocumento',
          label: 'Tipo Documento',
          format: formataNumberDate,
        },
        {
          id: 'numeroDocumento',
          label: 'Numero Documento',
          format: formataNumberDate,
        },
        {id: 'logradouro', label: 'Logradouro', format: formataNumberDate},
        {id: 'numero', label: 'Número', format: formataNumberDate},
        {id: 'bairro', label: 'Bairro', format: formataNumberDate},
        {id: 'cidade', label: 'Cidade', format: formataNumberDate},
        {id: 'uf', label: 'UF', format: formataNumberDate},
      ];
    } else if (condutorList) {
      return [
        {id: 'nome', label: 'Nome', format: formataNumberDate},
        {
          id: 'numeroHabilitacao',
          label: 'Número Habilitação',
          format: formataNumberDate,
        },
        {
          id: 'catergoriaHabilitacao',
          label: 'Categoria Habilitação',
          format: formataNumberDate,
        },
        {
          id: 'vencimentoHabilitacao',
          label: 'Vencimento Habilitação',
          format: formataNumberDate,
        },
      ];
    } else if (deslocamentoList) {
      return [
        {id: 'kmInicial', label: 'Km Inicial', format: formataNumberDate},
        {id: 'kmFinal', label: 'Km Inicial', format: formataNumberDate},
        {
          id: 'inicioDeslocamento',
          label: 'Início do Deslocamento',
          format: formataNumberDate,
        },
        {
          id: 'fimDeslocamento',
          label: 'Fim do Deslocamento',
          format: formataNumberDate,
        },
        {id: 'checkList', label: 'CheckList', format: formataNumberDate},
        {id: 'motivo', label: 'Motivo', format: formataNumberDate},
        {id: 'observacao', label: 'Observacao', format: formataNumberDate},
        {
          id: 'idCliente',
          label: 'Cliente',
          format: formataNumberDate,
        },
        {
          id: 'idCondutor',
          label: 'Condutor',
          format: formataNumberDate,
        },
        {
          id: 'idVeiculo',
          label: 'Veiculo',
          format: formataNumberDate,
        },
      ];
    } else if (veiculoList) {
      return [
        {id: 'placa', label: 'Placa', format: formataNumberDate},
        {id: 'marcaModelo', label: 'Marca/Modelo', format: formataNumberDate},
        {
          id: 'anoFabricacao',
          label: 'Ano de Fabricacao',
          format: formataNumberDate,
        },
        {id: 'kmAtual', label: 'Km Atual', format: formataNumberDate},
      ];
    } else {
      return [{id: 'null', label: `Ainda não há ${rota} cadastrados`}];
    }
  } else {
    return [{id: 'null', label: `Ainda não há ${rota} cadastrados`}];
  }
}
