import React, { useState } from "react";
import { Button, Dialog } from "@mui/material";
import LogoutModal from "../LogoutModal/LogoutModal";

function LogOutButton() {
  const [openLogout, setOpenLogout] = useState(false);

  const handleOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };
  return (
    <>
      <Button onClick={handleOpenLogout}>Выйти</Button>
      <Dialog
        open={openLogout}
        onClose={handleCloseLogout}
        fullWidth={true}
        maxWidth="sm"
      >
        <LogoutModal close={handleCloseLogout} />
      </Dialog>
    </>
  );
}

export default LogOutButton;
