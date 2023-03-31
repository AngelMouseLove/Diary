import React, { useContext } from "react";
import { Box, TextField, Button } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import api from "../API";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { urlValidation } from "../validation";
import { UserContext } from "../context/UserContext";

function SetUserInfoForm({ close }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      avatar: currentUser.avatar,
      name: currentUser.name,
      email: currentUser.email,
      about: currentUser.about,
    },
  });

  const newUserInfo = (data) => {
    const newData = { name: data.name, about: data.about };
    const newAvatar = { avatar: data.avatar };

    Promise.all([api.setUserInfo(newData), api.setUserAvatar(newAvatar)])
      .then(([userData, userAvatar]) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));

    close();
  };

  return (
    <>
      <DialogContent>
        <Box component={"form"} onSubmit={handleSubmit(newUserInfo)}>
          <Controller
            name="avatar"
            control={control}
            rules={urlValidation}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Аватар URL"
                size="medium"
                margin="normal"
                fullWidth
                value={value}
                onChange={(e) => onChange(e)}
                error={!!errors.avatar?.message}
                helperText={errors.avatar?.message}
              />
            )}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src={watch("avatar")}
              alt="user-avatar"
              sx={{ width: "350px", height: "350px", borderRadius: "50%" }}
            ></Box>
          </Box>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Обязательное поле" }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Ваше имя"
                size="medium"
                margin="normal"
                fullWidth
                value={value}
                onChange={(e) => onChange(e)}
                error={!!errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Ваш e-mail"
                size="medium"
                margin="normal"
                fullWidth
                disabled
                value={value}
                onChange={(e) => onChange(e)}
                error={!!errors.email?.message}
              />
            )}
          />

          <Controller
            name="about"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="О вас"
                size="medium"
                margin="normal"
                fullWidth
                value={value}
                onChange={(e) => onChange(e)}
                error={!!errors.about?.message}
              />
            )}
          />
          <DialogActions>
            <Button type="submit" variant="contained" sx={{ mt: "15px" }}>
              Записать
            </Button>
            <Button onClick={close} sx={{ mt: "15px" }}>
              Отмена
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </>
  );
}

export default SetUserInfoForm;
