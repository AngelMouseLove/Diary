import React, { useContext } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

function LogoutModal({ close }) {
  const navigate = useNavigate();
  const {setToken} = useContext(UserContext)

  const logout = () => {
    setToken(null)
    localStorage.removeItem("token");
    close();
    navigate("/");
  };

  return (
    <>
      <DialogTitle>Выйти из дневника</DialogTitle>
      <DialogContent>
        <DialogContentText>Вы хотите выйти из дневника?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={logout}>Выйти</Button>
        <Button onClick={close} autoFocus>
          Остаться
        </Button>
      </DialogActions>
    </>
  );
}

export default LogoutModal;
