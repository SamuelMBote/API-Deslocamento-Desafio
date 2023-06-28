import {DataElement} from '@/interfaces/TDataElement';

export function defaultValue(tipo: string): DataElement {
  if (tipo === 'cliente') {
    return {
      numeroDocumento: '',
      tipoDocumento: '',
      nome: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
    };
  } else if (tipo === 'condutor') {
    return {
      nome: '',
      numeroHabilitacao: '',
      categoriaHabilitacao: '',
      vencimentoHabilitacao: new Date(),
    };
  } else if (tipo === 'deslocamento') {
    return {
      kmInicial: 0,
      kmFinal: 0,
      inicioDeslocamento: new Date(),
      fimDeslocamento: new Date(),
      checkList: '',
      motivo: '',
      observacao: '',
      idCondutor: 0,
      idVeiculo: 0,
      idCliente: 0,
    };
  } else if (tipo === 'veiculo') {
    return {
      placa: '',
      marcaModelo: '',
      anoFabricacao: 0,
      kmAtual: 0,
    };
  } else {
    return {
      numeroDocumento: '',
      tipoDocumento: '',
      nome: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
    };
  }
}
