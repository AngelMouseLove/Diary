import React, { useState } from "react";
import { Box, TextField, Button, DialogActions, Dialog } from "@mui/material";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { passwordValidation } from "../validation";
import api from "../API";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function NewPasswordForm({ handleCloseNewPasswordForm }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: { token: "", password: "" },
  });

  const [openNewPasswordSuccess, setOpenNewPasswordSuccess] = useState(false);

  const handleOpenNewPasswordSuccess = () => {
    setOpenNewPasswordSuccess(true);
  };
  const handleCloseNewPasswordSuccess = () => {
    setOpenNewPasswordSuccess(false);
  };

  const saveNewPassword = (data) => {
    const { token, password } = data;
    api
      .setPassword(token, { password: password })
      .catch((err) => console.log(err));
    handleOpenNewPasswordSuccess();
  };

  return (
    <>
      <Box component={"form"} onSubmit={handleSubmit(saveNewPassword)}>
        <Controller
          name="token"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Секретное слово"
              size="medium"
              margin="normal"
              fullWidth
              value={value}
              onChange={(e) => onChange(e)}
              error={!!errors.token?.message}
              helperText={errors.token?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={passwordValidation}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Новый пароль"
              type="password"
              size="medium"
              margin="normal"
              fullWidth
              value={value}
              onChange={(e) => onChange(e)}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />
        <DialogActions>
          <Button
            onClick={handleSubmit(saveNewPassword)}
            variant="contained"
            sx={{ mt: "15px" }}
          >
            Сохранить пароль
          </Button>
        </DialogActions>
      </Box>

      <Dialog
        open={openNewPasswordSuccess}
        onClose={handleCloseNewPasswordSuccess}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Пароль успешно сохранен</DialogTitle>
        <DialogContent>
          <DialogContentText>Вы успешно изменили пароль</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseNewPasswordSuccess();
              handleCloseNewPasswordForm();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NewPasswordForm;
