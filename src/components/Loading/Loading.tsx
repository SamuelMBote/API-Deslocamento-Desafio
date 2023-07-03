import {Box, CircularProgress} from '@mui/material';

import React from 'react';

const Loading = () => {
  return (
    <Box
      component={'main'}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loading;
