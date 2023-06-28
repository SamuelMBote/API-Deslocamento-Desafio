import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {GetServerSideProps, GetStaticProps} from 'next';
import columns from '../../func/columns';
import {DataArrays} from '@/interfaces/TDataArray';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  AlertColor,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import {useRouter} from 'next/router';
import {DataElement} from '@/interfaces/TDataElement';
import AlertaErro from '../Helpers/Alert/AlertaErro';
import {IDeslocamento, isDeslocamento} from '@/interfaces/IDeslocamento';

import {isCliente} from '@/interfaces/ICliente';
import {isCondutor} from '@/interfaces/ICondutor';
import {isVeiculo} from '@/interfaces/IVeiculo';
import getListData from '@/func/getListData';
import tratamentoListaDados from '@/func/tratamentosDados/tratamentoListasDados';

export default function ListasDados({
  dados,
  updateList,
}: {
  dados: DataArrays;
  updateList: Function | null;
}) {
  const router = useRouter();
  const rota = router.pathname.replace('/', '');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [alerta, setAlerta] = React.useState<{
    error: boolean;
    message: string;
    severity: AlertColor;
  }>({error: false, message: '', severity: 'info'});
  const [detailDeslocamento, setDetailDeslocamento] = React.useState({
    cliente: '',
    condutor: '',
    veiculo: '',
  });
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
    initDeslocamento();
  }, []);
  async function handleDelete(infoToDelete: DataElement) {
    setAlerta({error: false, message: '', severity: 'info'});

    try {
      if (infoToDelete.id) {
        const id = infoToDelete.id;
        const response = await fetch(
          `https://api-deslocamento.herokuapp.com/api/v1/${rota.charAt(
            0,
          )}${rota.slice(1)}/${infoToDelete.id}`,
          {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id}),
          },
        );
        if (updateList) {
          updateList();
        }
        setAlerta({
          error: true,
          message: `${rota.charAt(0).toUpperCase()}${rota.slice(
            1,
          )} removido com sucesso`,
          severity: 'success',
        });
      }
    } catch (error) {
      if (error && error instanceof Error) {
        console.log(error);
      }
    }
  }

  return (
    <Paper sx={{margin: 2, padding: 2}}>
      <Stack
        sx={{
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Typography variant="h5">{`Lista de ${rota}`}</Typography>
        <Tooltip title={`Atualizar lista de ${rota}`}>
          <IconButton
            aria-label={`Atualizar lista de ${rota}`}
            onClick={(e) => {
              e.preventDefault();
              if (updateList) updateList();
            }}
          >
            <RefreshIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Stack>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns(dados, rota).map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dados &&
              dados
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns(dados, rota).map((column, index) => {
                        let value = (row as any)[column.id];
                        let cliente = null;
                        let condutor = null;
                        let veiculo = null;
                        if (column.id === 'idCondutor') {
                          const teste = optionsCondutor?.find(
                            (item) => item.id === value,
                          );
                          condutor = isCondutor(teste) && teste.nome;
                        }
                        if (column.id === 'idCliente') {
                          const teste = optionsCliente?.find(
                            (item) => item.id === value,
                          );
                          cliente = isCliente(teste) && teste.nome;
                        }
                        if (column.id === 'idVeiculo') {
                          const teste = optionsVeiculo?.find(
                            (item) => item.id === value,
                          );
                          veiculo = isVeiculo(teste) && teste.placa;
                        }
                        return (
                          <TableCell key={index} align={column.align}>
                            {column.format &&
                            (typeof value === 'number' || value)
                              ? column.format(value)
                              : value}
                            {cliente && ` - ${cliente}`}
                            {condutor && ` - ${condutor}`}
                            {veiculo && ` - ${veiculo}`}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Tooltip title="Deletar" placement="top">
                          <IconButton
                            aria-label="Deletar"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(row);
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
                              const goTo = `${router.pathname}/${row.id}?edit=true`;
                              router.push(goTo);
                            }}
                          >
                            <EditIcon color="warning" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Mais detalhes" placement="top">
                          <IconButton
                            aria-label="Mais detalhes"
                            onClick={(e) => {
                              e.preventDefault();
                              const goTo = `${router.pathname}/${row.id}`;
                              router.push(goTo);
                            }}
                          >
                            <InfoIcon color="info" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 50, 100]}
        component="div"
        count={dados && dados.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AlertaErro {...alerta} />
    </Paper>
  );
}
const getStaticProps: GetStaticProps = async ({}) => {
  let dados: DataArrays = [];
  let updateList: Function | null = null;
  return {props: {dados, updateList}};
};
