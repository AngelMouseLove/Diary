import React from "react";
import { Box, TextField, Button } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import api from "../API";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import moment from "moment";
import { DATE_PATTERN } from "../constants";
import { urlValidation } from "../validation";
import s from "./NewPostForm.module.css";

function NewPostForm({ create, close }) {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      text: "",
      image: "",
      tags: [],
    },
  });

  const addNewPost = (post) => {
    const newPost = {
      ...post,
      tags: post.tags.split(", "),
      title: moment(post.title, "YYYY-MM-DD").format(DATE_PATTERN),
    };
    api
      .createPost(newPost)
      .then((postData) => {
        create(postData);
      })
      .catch((err) => console.log(err));
    reset();
    close();
  };

  return (
    <>
      <DialogContent>
        <Box component={"form"} onSubmit={handleSubmit(addNewPost)}>
          <Controller
            name="image"
            control={control}
            rules={urlValidation}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Картинка воспоминания (URL)"
                size="medium"
                margin="normal"
                fullWidth
                value={value}
                onChange={(e) => onChange(e)}
                error={!!errors.image?.message}
                helperText={errors.image?.message}
              />
            )}
          />
          {watch("image", false) ? (
            <img src={watch("image")} alt="post-img" className={s.img}></img>
          ) : (
            <img
              src="https://b-n-c.ru/local/templates/.default/img/no-img.jpg"
              alt="no-img"
              className={s.img}
            ></img>
          )}

          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="date"
                size="medium"
                margin="normal"
                fullWidth
                value={value}
                onChange={(e) => onChange(e)}
                error={!!errors.title?.message}
                helperText="Введите дату события"
              />
            )}
          />

          <Controller
            name="text"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Опишите что произошло"
                size="medium"
                margin="normal"
                fullWidth
                multiline
                minRows={4}
                value={value}
                onChange={(e) => onChange(e)}
                error={!!errors.text?.message}
              />
            )}
          />

          <Controller
            name="tags"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Ключевые слова"
                size="medium"
                margin="normal"
                fullWidth
                value={value}
                onChange={(e) => onChange(e)}
                error={!!errors.tags?.message}
                helperText="Введите слова через запятую"
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

export default NewPostForm;
