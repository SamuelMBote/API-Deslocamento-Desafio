import {ICliente} from './ICliente';
import {ICondutor} from './ICondutor';
import {IDeslocamento} from './IDeslocamento';
import {IVeiculo} from './IVeiculo';

export type DataArrays = (ICliente | ICondutor | IDeslocamento | IVeiculo)[];
