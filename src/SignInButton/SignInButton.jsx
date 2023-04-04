import React, { useState, useEffect } from "react";
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

  const handleClickOpen = () => {
    navigate("/login");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

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
