import React, { useState, useEffect, useCallback } from "react";
import { Button, Dialog } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";

function SignInButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.pathname == "/login") {
      setOpen(true);
    }
  }, [location, setOpen]);

  const handleClickOpen = useCallback(() => {
    navigate("/login");
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false)});

  return (
    <>
      <Button onClick={handleClickOpen}>Продолжить вести дневник</Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <LoginForm close={handleClose} />
      </Dialog>
    </>
  );
}

export default SignInButton;
