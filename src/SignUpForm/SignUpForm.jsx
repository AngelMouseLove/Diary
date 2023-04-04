import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../API";
import { emailValidation, passwordValidation } from "../validation";
import {
  Box,
  Button,
  DialogContent,
  Dialog,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";

function SignUpForm({ close }) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleClickOpenError = () => {
    setOpenError(true);
  };

  const handleClickCloseError = () => {
    setOpenError(false);
  };

  const handleClickOpenSuccess = () => {
    setOpenSuccess(true);
  };

  const handleClickCloseSuccess = () => {
    close();
    navigate("/");
  };

  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      group: "",
      password: "",
    },
  });

  const signUp = useCallback((data) => {
    const { email, group, password } = data;
    api
      .signUp(email, group, password)
      .then(() => {
        handleClickOpenSuccess();
      })
      .catch((obj) => {
        if (obj.status === 409) {
          handleClickOpenError();
        } else {
          console.log(obj);
        }
      });
  }, []);

  return (
    <>
      <DialogTitle>Завести свой дневник</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Чтобы завести свой дневник, пройдите регистрацию
        </DialogContentText>
        <Box component={"form"} onSubmit={handleSubmit(signUp)}>
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
          <Controller
            name="group"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Ваша группа"
                size="medium"
                margin="normal"
                fullWidth
                value={value}
                onChange={(e) => onChange(e)}
                error={!!errors.group?.message}
                helperText={errors.group?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={passwordValidation}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Пароль"
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
            <Button variant="contained" type="submit">
              Завести дневник
            </Button>
            <Button onClick={() => navigate("/login")}>Продолжить вести дневник</Button>
            <Button onClick={close}>Отмена</Button>
          </DialogActions>
        </Box>
      </DialogContent>

      <Dialog open={openError} onClose={handleClickCloseError} fullWidth={true} maxWidth="sm">
        <DialogTitle>Ошибка</DialogTitle>
        <DialogContent>Автор с таким email уже существует</DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseError} variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSuccess} onClose={handleClickCloseSuccess} fullWidth={true} maxWidth="sm">
        <DialogTitle>Регистрация пройдена</DialogTitle>
        <DialogContent>
          Вы завели дневник. Выполните вход и приступайте к записям
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseSuccess} variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SignUpForm;
