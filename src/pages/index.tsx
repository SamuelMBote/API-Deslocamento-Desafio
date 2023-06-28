import Head from 'next/head';
import Image from 'next/image';
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
import {GetServerSideProps, GetStaticProps} from 'next';
const inter = Inter({subsets: ['latin']});

export default function Home() {
  const navigateTo = useRouter();
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
        <Grid container spacing={1}>
          {routes.map((route) => {
            return (
              <Grid key={route.path} item xs={12} md={6}>
                <Card>
                  <CardActionArea
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo.push(route.path);
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
                        navigateTo.push(route.path);
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
  return {props: {}};
};

