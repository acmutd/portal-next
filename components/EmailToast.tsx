import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '../icons/CloseIcon';

/** A toast is a lightweight notifications designed to mimic the push notifications
 *  that have been popularized by mobile and desktop operating systems.
 *
 * This one is shown to the user to notift them of a confirmation email being sent to them.*/
export default function EmailToast(openState: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    openState.setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton color="secondary" size="small" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={openState.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="A confirmation has been sent to your email address."
        action={action}
      />
    </div>
  );
}
