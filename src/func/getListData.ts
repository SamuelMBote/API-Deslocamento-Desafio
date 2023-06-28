import {DataArrays} from '@/interfaces/TDataArray';

export default async function getListData(dataToRetrieve: string) {
  let lista: DataArrays = [];

  try {
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/${dataToRetrieve}`,
      {method: 'GET', headers: {'Content-Type': 'application/json'}},
    );
    const json = await response.json();

    if (Array.isArray(json)) {
      lista = json.map((item) => {
        return item;
      });
    } else {
      throw new Error(`Não foi retornado uma lista de ${dataToRetrieve}`);
    }
  } catch (error) {
    if (error && error instanceof Error) {
      console.log(error.message);
    }
  }
  return lista;
}
