import Head from 'next/head';

import {Inter} from 'next/font/google';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import routes from '@/routes/route';
import {useRouter} from 'next/router';
import {GetStaticProps} from 'next';
import WeatherContainer from '@/components/Weather/WeatherContainer';
import Loading from '@/components/Loading/Loading';
import React from 'react';
const inter = Inter({subsets: ['latin']});

export default function Home({weather}: {weather: any[]}) {
  const router = useRouter();
  const [pageLoad, setPageLoad] = React.useState<boolean>(false);
  React.useEffect(() => {
    router.events.on('routeChangeStart', () => setPageLoad(true));
    router.events.on('routeChangeComplete', () => setPageLoad(false));
  }, [router]);
  if (pageLoad) {
    return <Loading />;
  } else
    return (
      <>
        <Head>
          <title>
            Desafio de Desenvolvimento Front-End - Aplicação de Deslocamento
          </title>
          <meta
            name="description"
            content="Desenvolva uma aplicação front-end utilizando ReactJS com TypeScript, utilizando o framework Next.js e a biblioteca Material-UI, que permita aos usuários interagir com a API Deslocamento para realizar operações relacionadas a clientes, condutores, deslocamentos e veículos. A aplicação deve fornecer interfaces para criar, visualizar, atualizar e excluir registros em cada uma dessas entidades, seguindo as melhores práticas e padrões de desenvolvimento."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box component={'main'}>
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Typography>Olá Usuári@!</Typography>
            <Typography>Seja bem vindo</Typography>
          </Box>
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <WeatherContainer weather={weather} />
          </Box>
          <Grid container spacing={1}>
            {routes.map((route) => {
              return (
                <Grid key={route.path} item xs={12} md={6}>
                  <Card>
                    <CardActionArea
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(route.path);
                      }}
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {route.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(route.path);
                        }}
                      >
                        IR ATÉ PÁGINA
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
  let weather = [];
  try {
    const response = await fetch(
      'https://api-deslocamento.herokuapp.com/api/v1/WeatherForecast',
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      },
    );
    const json = await response.json();
    if (json && Array.isArray(json)) {
      weather = json;
    }
  } catch (error) {}
  return {props: {weather}};
};

