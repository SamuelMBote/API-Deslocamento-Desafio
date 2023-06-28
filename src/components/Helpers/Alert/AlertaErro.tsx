import React from 'react';
import MuiAlert, {AlertProps, AlertColor} from '@mui/material/Alert';
import {Snackbar, SnackbarOrigin} from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface StateAlert extends SnackbarOrigin {
  open: boolean;
  message: string;
  severity?: AlertColor;
}
const AlertaErro = ({
  error,
  message,
  severity,
}: {
  error: boolean;
  message: string;
  severity: AlertColor;
}) => {
  const [snackBarState, setSnackBarState] = React.useState<StateAlert>({
    open: false,
    message: '',
    vertical: 'bottom',
    horizontal: 'right',
  });
  const {vertical, horizontal, open} = snackBarState;

  function openAlert(newState: SnackbarOrigin) {
    setSnackBarState({open: error, message, severity, ...newState});
  }

  function closeAlert() {
    setSnackBarState({...snackBarState, open: false});
  }
  React.useEffect(() => {
    openAlert({horizontal: 'right', vertical: 'bottom'});
  }, [error]);
  return (
    <Snackbar
      anchorOrigin={{vertical, horizontal}}
      open={open}
      onClose={closeAlert}
      key={vertical + horizontal}
    >
      <Alert
        onClose={closeAlert}
        severity={severity ? severity : 'info'}
        sx={{width: '100%'}}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertaErro;
