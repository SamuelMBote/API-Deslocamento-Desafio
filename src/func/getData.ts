import {isCliente} from '@/interfaces/ICliente';
import {isCondutor} from '@/interfaces/ICondutor';
import {isVeiculo} from '@/interfaces/IVeiculo';

async function getData(rota: string, id: number) {
  let value = '';
  try {
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/${rota}/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          body: JSON.stringify({id}),
        },
      },
    );
    const json = await response.json();
    if (json && isCliente(json)) {
      value = json.nome;
    }
    if (json && isCondutor(json)) {
      value = json.nome;
    }
    if (json && isVeiculo(json)) {
      value = `${json.placa} - ${json.marcaModelo}`;
    }
  } catch (error) {}
  return value;
}
