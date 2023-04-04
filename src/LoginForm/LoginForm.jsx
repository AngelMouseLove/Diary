import React, { useContext, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { emailValidation } from "../validation";
import { UserContext } from "../context/UserContext";
import api from "../API";
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
import { useNavigate } from "react-router-dom";

function LoginForm({ close }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      password: "",
    },
  });

  const { setToken, setCurrentUser } = useContext(UserContext);

  const signIn = useCallback((data) => {
    const { email, password } = data;
    api
      .signIn(email, password)
      .then((obj) => {
          api.setToken(obj.token);
          setToken(obj.token);
          localStorage.setItem("token", obj.token);
          setCurrentUser(obj.data);
          close();
          navigate("/");
      })
      .catch(() => handleClickOpen());
  }, []);

  return (
    <>
      <DialogTitle>Войти в свой дневник</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Чтобы продолжить вести свой дневник, выполните вход
        </DialogContentText>
        <Box component={"form"} onSubmit={handleSubmit(signIn)}>
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
            name="password"
            control={control}
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
              Продолжить вести дневник
            </Button>
            <Button onClick={() => navigate("/signup")}>Завести новый дневник</Button>
            <Button onClick={close}>Отмена</Button>
          </DialogActions>
        </Box>
      </DialogContent>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogTitle>Ошибка</DialogTitle>
        <DialogContent>Неправильные почта или пароль</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default LoginForm;
