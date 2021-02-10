import React, { useContext, useEffect, SyntheticEvent, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import { UserContext, AppStateType } from "../context/UserContext";


const AppStateSnackbar = () => {
  const {appState, resetAppState } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(appState ? true : false);
  });

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    resetAppState();
    setOpen(false);
  };
  
  return (
    <React.Fragment>
      {appState && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity={appState.type === AppStateType.SUCCESS ? "success" : "error"}>
                 {appState.message}
             </Alert>
        </Snackbar>
      )}
    </React.Fragment>
  );
};

export default AppStateSnackbar;
