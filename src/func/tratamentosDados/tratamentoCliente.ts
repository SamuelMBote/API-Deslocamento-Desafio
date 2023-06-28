import {ICliente} from '@/interfaces/ICliente';
export default function tratamentoCliente(obj: ICliente[]): ICliente[];
export default function tratamentoCliente(obj: ICliente): ICliente;
export default function tratamentoCliente(
  obj: ICliente | ICliente[],
): ICliente | ICliente[] {
  if (obj && Array.isArray(obj)) {
    return obj.map((item) => {
      return {...item};
    });
  } else {
    const cliente: ICliente = {...obj};
    return cliente;
  }
}
