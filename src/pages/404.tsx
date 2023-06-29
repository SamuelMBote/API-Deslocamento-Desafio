import {Box, Typography} from '@mui/material';
import React from 'react';
import ReportIcon from '@mui/icons-material/Report';
const Error404 = () => {
  return (
    <Box
      component={'main'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography fontSize={'200px'}>
        <ReportIcon color="error" fontSize="inherit" />
      </Typography>

      <Typography variant="h3">Erro 404</Typography>
      <Typography variant="h5">Página não encontrada!</Typography>
    </Box>
  );
};

export default Error404;
