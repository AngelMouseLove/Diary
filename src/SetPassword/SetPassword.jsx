import React, { useContext } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import NewPasswordForm from "../NewPasswordForm/NewPasswordForm";
import api from "../API";
import { UserContext } from "../context/UserContext";

function SetPassword() {
  const [openResetPassword, setOpenResetPassword] = useState(false);

  const { currentUser } = useContext(UserContext);

  const handleOpenResetPassword = () => {
    setOpenResetPassword(true);
  };
  const handleCloseResetPassword = () => {
    setOpenResetPassword(false);
  };

  const [openNewPasswordForm, setOpenNewPasswordForm] = useState(false);

  const handleOpenNewPasswordForm = () => {
    setOpenNewPasswordForm(true);
  };
  const handleCloseNewPasswordForm = () => {
    setOpenNewPasswordForm(false);
  };

  const resetPassword = () => {
    // api.resetPassword(currentUser.email).catch((err) => console.log(err))
    handleCloseResetPassword();
    handleOpenNewPasswordForm();
  };

  return (
    <>
      <Button sx={{ mt: "15px" }} onClick={handleOpenResetPassword}>
        Сбросить пароль
      </Button>
      <Dialog
        open={openResetPassword}
        onClose={handleCloseResetPassword}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Сброс пароля</DialogTitle>
        <DialogContent>
          <DialogContentText>
            При нажатии кнопки сброса пароля Вам на&nbsp;почту придет секретное
            слово. Введите секретное слово, а&nbsp;затем введите новый пароль.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetPassword}>Сброс пароля</Button>
          <Button onClick={handleCloseResetPassword} autoFocus>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openNewPasswordForm}
        onClose={handleCloseNewPasswordForm}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Новый пароль</DialogTitle>
        <DialogContent>
          <NewPasswordForm
            handleCloseNewPasswordForm={handleCloseNewPasswordForm}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SetPassword;
