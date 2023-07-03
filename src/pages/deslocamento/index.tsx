import Cadastrar from '@/components/Cadastrar/Cadastrar';
import ListasDados from '@/components/ListasDados/ListasDados';
import Loading from '@/components/Loading/Loading';
import getListData from '@/func/getListData';
import tratamentoListasDados from '@/func/tratamentosDados/tratamentoListasDados';
import {DataArrays} from '@/interfaces/TDataArray';

import {Box} from '@mui/material';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React from 'react';

export default function Cliente({
  dados,
  rota,
}: {
  dados: DataArrays;
  rota: string;
}) {
  const [listaDados, setListaDados] = React.useState(
    tratamentoListasDados(dados),
  );
  const router = useRouter();
  const [pageLoad, setPageLoad] = React.useState<boolean>(false);
  React.useEffect(() => {
    router.events.on('routeChangeStart', () => setPageLoad(true));
    router.events.on('routeChangeComplete', () => setPageLoad(false));
  }, [router]);
  async function handleUpdate() {
    const lista = await getListData(rota);
    setListaDados(tratamentoListasDados(lista));
  }
  if (pageLoad) {
    return <Loading />;
  } else
    return (
      <Box component={'main'}>
        <Head>
          <title>{`Lista de ${rota}`}</title>
        </Head>
        <Cadastrar updateList={handleUpdate} />
        <ListasDados dados={listaDados} updateList={handleUpdate} />
      </Box>
    );
}
export const getServerSideProps: GetServerSideProps = async ({resolvedUrl}) => {
  let dados: DataArrays;
  const rota = resolvedUrl.replace('/', '');
  dados = await getListData(rota);

  return {props: {dados, rota}};
};
