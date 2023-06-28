import {ICliente, isCliente} from '@/interfaces/ICliente';
import {ICondutor, isCondutor} from '@/interfaces/ICondutor';
import {IDeslocamento, isDeslocamento} from '@/interfaces/IDeslocamento';
import {IVeiculo, isVeiculo} from '@/interfaces/IVeiculo';
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
import {DataArrays} from '@/interfaces/TDataArray';
import getListData from '@/func/getListData';
import tratamentoListaDados from '@/func/tratamentosDados/tratamentoListasDados';

const Deslocamento = ({
  elemento,
  setElemento,
}: {
  elemento: DataElement;
  setElemento: React.Dispatch<React.SetStateAction<DataElement>>;
}) => {
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
  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        {optionsCliente && (
          <FormControl fullWidth>
            <InputLabel id="Clientes">Clientes</InputLabel>
            <Select
              labelId="Clientes"
              id="clientes"
              value={isDeslocamento(elemento) && elemento.idCliente}
              label="Clientes"
              onChange={(e) => {
                if (elemento && isDeslocamento(elemento))
                  setElemento({
                    ...elemento,
                    idCliente: Number(e.target.value),
                  });
              }}
            >
              <MenuItem disabled value={0}>
                Selecione um Cliente
              </MenuItem>
              {optionsCliente.map((cliente) => {
                if (cliente && isCliente(cliente))
                  return (
                    <MenuItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </MenuItem>
                  );
              })}
            </Select>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        {optionsCondutor && (
          <FormControl fullWidth>
            <InputLabel id="Condutores">Condutores</InputLabel>
            <Select
              labelId="Condutores"
              id="condutores"
              value={isDeslocamento(elemento) && elemento.idCondutor}
              label="Condutores"
              onChange={(e) => {
                if (elemento && isDeslocamento(elemento))
                  setElemento({
                    ...elemento,
                    idCondutor: Number(e.target.value),
                  });
              }}
            >
              <MenuItem disabled value={0}>
                Selecione um Condutor
              </MenuItem>
              {optionsCondutor.map((condutor) => {
                if (condutor && isCondutor(condutor))
                  return (
                    <MenuItem key={condutor.id} value={condutor.id}>
                      {condutor.nome}
                    </MenuItem>
                  );
              })}
            </Select>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        {optionsVeiculo && (
          <FormControl fullWidth>
            <InputLabel id="Veiculos">Veículos</InputLabel>
            <Select
              labelId="Veiculos"
              id="veiculos"
              value={isDeslocamento(elemento) && elemento.idVeiculo}
              label="Veiculos"
              onChange={(e) => {
                if (elemento && isDeslocamento(elemento))
                  setElemento({
                    ...elemento,
                    idVeiculo: Number(e.target.value),
                  });
              }}
            >
              <MenuItem disabled value={0}>
                Selecione um Veiculo
              </MenuItem>
              {optionsVeiculo.map((veiculo) => {
                if (veiculo && isVeiculo(veiculo))
                  return (
                    <MenuItem key={veiculo.id} value={veiculo.id}>
                      {`${veiculo.placa} - ${veiculo.marcaModelo}`}
                    </MenuItem>
                  );
              })}
            </Select>
          </FormControl>
        )}
      </Grid>
    </>
  );
};

export default Deslocamento;
export const getStaticProps: GetStaticProps = async () => {
  let elemento: DataElement | null = null;
  let setElemento: React.Dispatch<
    React.SetStateAction<DataElement | null>
  > | null;
  setElemento = null;
  return {props: {elemento, setElemento}};
};
