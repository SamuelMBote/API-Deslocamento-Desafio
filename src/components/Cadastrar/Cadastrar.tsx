import inputFields from '@/func/inputFields';
import {ICliente, isCliente} from '@/interfaces/ICliente';
import SaveIcon from '@mui/icons-material/Save';
import {
  AlertColor,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import {GetStaticProps} from 'next';
import React from 'react';
import {defaultValue} from '../Helpers/default/Default';
import {useRouter} from 'next/router';
import {ICondutor, isCondutor} from '@/interfaces/ICondutor';
import {IDeslocamento, isDeslocamento} from '@/interfaces/IDeslocamento';
import {IVeiculo, isVeiculo} from '@/interfaces/IVeiculo';
import {DataElement} from '@/interfaces/TDataElement';
import AlertaErro from '../Helpers/Alert/AlertaErro';
import {DataArrays} from '@/interfaces/TDataArray';
import getListData from '@/func/getListData';
import tratamentoListaDados from '@/func/tratamentosDados/tratamentoListasDados';
import Condutores from '../ClientePainelExibicao/Deslocamento';
import Deslocamento from '../ClientePainelExibicao/Deslocamento';

export default function Cadastrar({updateList}: {updateList: Function | null}) {
  const {pathname} = useRouter();
  const [cadastro, setCadastro] = React.useState<DataElement>(
    defaultValue(pathname.replace('/', '')),
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [alerta, setAlerta] = React.useState<{
    error: boolean;
    message: string;
    severity: AlertColor;
  }>({error: false, message: '', severity: 'info'});
  const [optionsCliente, setOptionsCliente] = React.useState<DataArrays | null>(
    null,
  );
  const [optionsCondutor, setOptionsCondutor] =
    React.useState<DataArrays | null>(null);
  const [optionsVeiculo, setOptionsVeiculo] = React.useState<DataArrays | null>(
    null,
  );
  async function initDeslocamento() {
    const cliente = await getListData('cliente');
    const condutor = await getListData('condutor');
    const veiculo = await getListData('veiculo');
    setOptionsCliente(tratamentoListaDados(cliente));
    setOptionsCondutor(tratamentoListaDados(condutor));
    setOptionsVeiculo(tratamentoListaDados(veiculo));
  }

  React.useEffect(() => {
    if (pathname.replace('/', '') === 'deslocamento') {
      initDeslocamento();
    }
  }, [pathname]);
  async function handleSave(infoToSave: DataElement) {
    setLoading(true);
    setAlerta({error: false, message: '', severity: 'info'});
    try {
      let url = `https://api-deslocamento.herokuapp.com/api/v1${pathname}`;

      if (pathname.replace('/', '') === 'deslocamento') {
        url = `https://api-deslocamento.herokuapp.com/api/v1${pathname}/IniciarDeslocamento`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(infoToSave),
      });
      const json = await response.json();

      if (response.ok) {
        setCadastro({...infoToSave, id: json});
        setAlerta({
          error: true,
          message: `Cadastro de ${pathname.replace(
            '/',
            '',
          )} realizado com sucesso`,
          severity: 'success',
        });
        if (updateList) {
          updateList();
        }
      } else {
        throw new Error(`Erro ao cadastrar ${pathname.replace('/', '')}`);
      }
    } catch (error) {
      if (error && error instanceof Error) {
        setAlerta({
          error: true,
          message: `Erro:${error.message}`,
          severity: 'error',
        });
      }
    } finally {
      setLoading(false);

      setCadastro(defaultValue(pathname.replace('/', '')));
    }
  }

  return (
    <Paper sx={{margin: 2, padding: 2}}>
      <Stack
        sx={{
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Tooltip
            title={`Salvar ${pathname.replace('/', '')}`}
            placement="top"
          >
            <IconButton
              aria-label={`Salvar ${pathname.replace('/', '')}`}
              onClick={(e) => {
                e.preventDefault();
                const camposPreenchidos =
                  cadastro &&
                  Object.entries(cadastro)
                    .map((item) => {
                      return String(item[1]).length >= 1;
                    })
                    .every((item) => item === true);

                if (cadastro && camposPreenchidos) {
                  handleSave(cadastro);
                } else {
                  alert('Preencha todos os campos');
                }
              }}
            >
              <SaveIcon fontSize="large" color="info" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Box component={'form'}>
        <Grid
          container
          direction={'row'}
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          {cadastro &&
            inputFields(cadastro, '').map((dado, index) => {
              const value: any | string | number | Date = (
                cadastro as unknown as
                  | keyof ICliente
                  | keyof ICondutor
                  | keyof IDeslocamento
                  | keyof IVeiculo
              )[dado.id as any];
              let erro = false;
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
                      sx={{width: '100%'}}
                      label={dado.label}
                      value={value}
                      onChange={(novaData) => {
                        setCadastro({...cadastro, [dado.id]: novaData});
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
                      fullWidth
                      disabled={dado.id === 'id'}
                      key={index}
                      id={dado.id}
                      value={value}
                      onChange={(e) => {
                        setCadastro({
                          ...cadastro,
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
          {pathname.replace('/', '') === 'deslocamento' && (
            <Deslocamento elemento={cadastro} setElemento={setCadastro} />
          )}
        </Grid>
      </Box>
      <AlertaErro {...alerta} />
    </Paper>
  );
}
export const getStaticProps: GetStaticProps = async ({locale}) => {
  let updateList: Function | null = null;
  return {props: {updateList}};
};
