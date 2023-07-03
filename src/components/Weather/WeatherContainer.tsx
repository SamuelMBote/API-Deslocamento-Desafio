import {Box, Grid, Typography} from '@mui/material';
import React from 'react';
import Weather from './Weather';
import {IWeather} from '@/interfaces/IWeather';

const WeatherContainer = ({weather}: {weather: IWeather[]}) => {
  return (
    <Box component={'div'} m={5}>
      <Typography variant="h6" textAlign={'center'} m={2}>
        Previsão do tempo para os próximos dias
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={8}
      >
        {weather.map((item) => {
          return (
            <Grid
              key={`${new Date(item.date)} ${item.temperatureC}`}
              item
              xs={12}
              md={4}
              lg={2}
            >
              <Weather weather={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WeatherContainer;
