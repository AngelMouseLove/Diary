import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Dialog } from "@mui/material";
import SignUpForm from "../SignUpForm/SignUpForm";

function SignUpButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.pathname == "/signup") {
      setOpen(true);
    }
  }, [location, setOpen]);

  const handleClickOpen = useCallback(() => {
    navigate("/signup");
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>Завести дневник</Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <SignUpForm close={handleClose} />
      </Dialog>
    </>
  );
}

export default SignUpButton;
