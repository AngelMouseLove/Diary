import React, { useContext } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Box } from "@mui/material";
import NewPasswordForm from "../NewPasswordForm/NewPasswordForm";
import api from "../API";
import { UserContext } from "../context/UserContext";
import { useForm, Controller } from "react-hook-form";
import { emailValidation } from "../validation";

function SetPassword() {
  const { currentUser, token } = useContext(UserContext);

  const [openResetPassword, setOpenResetPassword] = useState(false);

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

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const resetPassword = (data) => {
    const { email } = data;
    api
      .resetPassword({ email: currentUser.email || email })
      .catch((err) => console.log(err));
    reset();
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
          {!token && (
            <Box component={"form"} onSubmit={handleSubmit(resetPassword)}>
              <Controller
                name="email"
                control={control}
                rules={emailValidation}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="E-mail автора"
                    size="medium"
                    margin="normal"
                    fullWidth
                    value={value}
                    onChange={(e) => onChange(e)}
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleSubmit(resetPassword)}>
            Сброс пароля
          </Button>
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
