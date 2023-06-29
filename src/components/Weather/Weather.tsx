import {IWeather} from '@/interfaces/IWeather';
import {Card, CardContent, Typography} from '@mui/material';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import React from 'react';

const Weather = ({weather}: {weather: IWeather}) => {
  return (
    <Card variant="outlined" sx={{minWidth: 200, p: 2}}>
      <CardContent>
        <Typography>
          {format(new Date(weather.date), 'dd/MMMM/yyyy', {locale: ptBR})}
        </Typography>
        <Typography>{`${weather.temperatureC}ºC`}</Typography>
        <Typography>{`${weather.temperatureF}ºF`}</Typography>
        <Typography>{`${weather.summary}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default Weather;
