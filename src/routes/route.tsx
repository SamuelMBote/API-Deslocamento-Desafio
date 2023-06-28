import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import TrafficIcon from '@mui/icons-material/Traffic';

const routes: {
  title: string;
  path: string;
  icon?: React.ElementType;
  subroute?: {title: string; path: string}[];
}[] = [
  {
    title: 'Cliente',
    path: '/cliente',
    icon: PersonIcon,
  },
  {title: 'Condutor', path: '/condutor', icon: SportsMotorsportsIcon},
  {title: 'Deslocamento', path: '/deslocamento', icon: TrafficIcon},
  {title: 'Veículo', path: '/veiculo', icon: LocalShippingIcon},
];
export default routes;
