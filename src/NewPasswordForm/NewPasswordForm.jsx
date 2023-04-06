import React, { useContext, useState } from "react";
import { Box, TextField, Button, DialogActions, Dialog } from "@mui/material";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { passwordValidation } from "../validation";
import api from "../API";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function NewPasswordForm({ handleCloseNewPasswordForm }) {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);
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
      .setPassword(token, {password: password})
      .then((obj) => {
      // setToken(obj.token);
      // localStorage.setItem("token", obj.token);
      handleCloseNewPasswordForm();
      handleOpenNewPasswordSuccess();
    }).catch((err) => console.log(err));
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(saveNewPassword)}>
      <Controller
        name="token"
        control={control}
        rules={"Обязательное поле"}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Секретное слово"
            size="medium"
            margin="normal"
            fullWidth
            value={value}
            onChange={(e) => onChange(e)}
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
        <Button type="submit" variant="contained" sx={{ mt: "15px" }}>
          Сохранить пароль
        </Button>
      </DialogActions>

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
          <Button onClick={handleCloseNewPasswordSuccess}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NewPasswordForm;
