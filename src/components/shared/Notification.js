import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

export default function NotificationComponent(props) {
  const {openNotify, setOpenNotify, message, notificationType} = props;
  const handleClose = (event, reason) => {
    if(reason === 'clickaway')
      return;
    setOpenNotify(false);
  };

  return (
    <Snackbar
      open={openNotify}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notificationType} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}