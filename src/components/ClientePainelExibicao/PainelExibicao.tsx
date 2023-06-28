import {ICliente} from '@/interfaces/ICliente';
import {ICondutor} from '@/interfaces/ICondutor';
import {IDeslocamento} from '@/interfaces/IDeslocamento';
import {IVeiculo} from '@/interfaces/IVeiculo';
import {
  AlertColor,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import {GetStaticProps} from 'next';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import {useRouter} from 'next/router';
import {DatePicker} from '@mui/x-date-pickers';
import inputFields from '@/func/inputFields';
import tratamentoDadosEspecificos from '@/func/tratamentosDados/tratamentoDadoEspecifico';
import {DataElement} from '@/interfaces/TDataElement';
import AlertaErro from '../Helpers/Alert/AlertaErro';
import Deslocamento from './Deslocamento';
const PainelExibicao = ({
  elemento,
  editElemento,
}: {
  elemento: DataElement;
  editElemento: boolean;
}) => {
  const [infoElemento, setInfoElemento] = React.useState<DataElement>(
    tratamentoDadosEspecificos(elemento),
  );
  const [edit, setEdit] = React.useState<boolean>(editElemento);
  const router = useRouter();
  const [alerta, setAlerta] = React.useState<{
    error: boolean;
    message: string;
    severity: AlertColor;
  }>({error: false, message: '', severity: 'info'});
  const idPagina =
    router.query &&
    'id' in router.query &&
    typeof router.query.id === 'string' &&
    router.query.id;
  const rota = idPagina && router.pathname.replace('[id]', idPagina);

  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleDelete(infoToDelete: DataElement) {
    setAlerta({error: false, message: '', severity: 'info'});

    try {
      if (infoToDelete.id) {
        const id = infoToDelete.id;
        let url = `https://api-deslocamento.herokuapp.com/api/v1${rota}`;

        const response = await fetch(url, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id}),
        });
        router.push(router.pathname.replace('/[id]', ''));
      } else {
        throw new Error(`Erro ao remover ${rota}`);
      }
    } catch (error) {
      if (error && error instanceof Error) {
        console.log(error.message);
      }
    } finally {
    }
  }
  async function handleEdit(infoToUpdate: DataElement) {
    setLoading(true);
    setAlerta({error: false, message: '', severity: 'info'});
    let url = `https://api-deslocamento.herokuapp.com/api/v1${rota}`;
    if (rota && rota.includes('deslocamento')) {
      url = `https://api-deslocamento.herokuapp.com/api/v1${rota}/EncerrarDeslocamento`;
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {accept: '*/*', 'Content-Type': 'application/json'},
        body: JSON.stringify(infoToUpdate),
      });
      const json = await response.json();

      setAlerta({
        error: true,
        message: 'Atualizado com sucesso',
        severity: 'success',
      });
    } catch (error) {
      if (error && error instanceof Error) {
        console.log(error.message);
        console.log(url);
        console.log(url);
      }
    } finally {
      setLoading(false);
    }
    setAlerta({
      error: true,
      message: 'Atualizado com sucesso mas sem retorno da API',
      severity: 'warning',
    });
  }

  return (
    <Paper elevation={5} sx={{p: 5}}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack
          sx={{
            marginBottom: 2,
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <Tooltip title="Deletar" placement="top">
            <IconButton
              aria-label="Deletar"
              onClick={(e) => {
                e.preventDefault();
                handleDelete(infoElemento);
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar" placement="top">
            <IconButton
              aria-label="Editar"
              onClick={(e) => {
                e.preventDefault();
                setEdit(!edit);
                if (edit) {
                  handleEdit(infoElemento);
                }
              }}
            >
              {edit ? (
                <DoneIcon color="success" />
              ) : (
                <EditIcon color="warning" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Voltar para listagem" placement="top">
            <IconButton
              aria-label="Voltar para listagem"
              onClick={(e) => {
                e.preventDefault();
                router.push(router.pathname.replace('/[id]', ''));
              }}
            >
              <ArrowBackIcon color="info" />
            </IconButton>
          </Tooltip>
        </Stack>
      )}

      <Box component={'form'}>
        <Grid
          container
          direction={'row'}
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          {inputFields(infoElemento, '').map((dado, index) => {
            const value: any | string | number | Date = (
              infoElemento as unknown as
                | keyof ICliente
                | keyof ICondutor
                | keyof IDeslocamento
                | keyof IVeiculo
            )[dado.id as any];

            if (value && typeof value === 'object' && value instanceof Date) {
              return (
                <Grid
                  item
                  key={index}
                  xs={12}
                  md={6}
                  lg={dado.gridColumn && dado.gridColumn}
                >
                  <DatePicker
                    disabled={!edit || dado.id === 'id'}
                    label={dado.label}
                    value={value}
                    sx={{width: '100%'}}
                    onChange={(novaData) => {
                      setInfoElemento({...infoElemento, [dado.id]: novaData});
                    }}
                  />
                </Grid>
              );
            } else {
              return (
                <Grid
                  item
                  key={index}
                  xs={12}
                  md={6}
                  lg={dado.gridColumn && dado.gridColumn}
                >
                  <TextField
                    disabled={!edit || dado.id === 'id'}
                    key={index}
                    id={dado.id}
                    value={value ? value : ''}
                    fullWidth
                    onChange={(e) => {
                      setInfoElemento({
                        ...infoElemento,
                        [dado.id]: e.target.value,
                      });
                    }}
                    label={dado.label}
                    variant="outlined"
                  />
                </Grid>
              );
            }
          })}
          {rota && rota.includes('deslocamento') && (
            <Deslocamento
              elemento={infoElemento}
              setElemento={setInfoElemento}
            />
          )}
        </Grid>
      </Box>
      <AlertaErro {...alerta} />
    </Paper>
  );
};

export default PainelExibicao;
export const getStaticProps: GetStaticProps = async () => {
  let elemento: DataElement | null = null;
  let editElemento = false;
  return {props: {elemento, editElemento}};
};
