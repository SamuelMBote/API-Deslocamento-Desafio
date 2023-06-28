import Header from '@/components/Header/Header';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {ptBR} from 'date-fns/locale';
import type {AppProps} from 'next/app';

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Header components={<Component {...pageProps} />} />
      </LocalizationProvider>
    </>
  );
}

