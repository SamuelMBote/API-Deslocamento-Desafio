import PainelExibicao from '@/components/ClientePainelExibicao/PainelExibicao';
import Loading from '@/components/Loading/Loading';
import {IVeiculo} from '@/interfaces/IVeiculo';
import {Box, Typography} from '@mui/material';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React from 'react';

export default function VeiculoDetail({elemento}: {elemento: IVeiculo}) {
  const router = useRouter();
  const editar = router.query && 'edit' in router.query && router.query.edit;
  const [pageLoad, setPageLoad] = React.useState<boolean>(false);
  React.useEffect(() => {
    router.events.on('routeChangeStart', () => setPageLoad(true));
    router.events.on('routeChangeComplete', () => setPageLoad(false));
  }, [router]);
  if (pageLoad) {
    return <Loading />;
  } else
    return (
      <Box component={'main'}>
        <Head>
          <title>{`Veiculo: ${elemento.id} `}</title>
        </Head>
        <Typography>{`Veiculo: ${elemento.id}`}</Typography>
        <PainelExibicao
          elemento={{...elemento}}
          editElemento={editar && editar === 'true' ? true : false}
        />
      </Box>
    );
}
export const getServerSideProps: GetServerSideProps = async ({resolvedUrl}) => {
  let elemento: any = {};
  let erro: string | null = null;
  try {
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1${resolvedUrl}`,
    );

    const json = await response.json();
    if (json && typeof json === 'object') {
      elemento = {...json};
    } else {
      throw new Error(
        `Não foi possível buscas as informacoes especificas do ${resolvedUrl}`,
      );
    }
  } catch (error) {
    if (error && error instanceof Error) {
      erro = error.message;
    }
  }
  return {props: {elemento}};
};
