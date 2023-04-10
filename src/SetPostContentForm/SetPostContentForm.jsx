import React from "react";
import { Box, TextField, Button } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import api from "../API";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { urlValidation } from "../validation";
import moment from "moment";
import { DATE_PATTERN } from "../constants";

function SetPostContentForm({ close, post, _id }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: moment(post.title, DATE_PATTERN).format("YYYY-MM-DD"),
      text: post.text,
      image: post.image,
      tags: post.tags.join(", "),
    },
  });

  const setPost = (post) => {
    const newPostContent = {
      ...post,
      tags: post.tags.split(", "),
      title: moment(post.title, "YYYY-MM-DD").format(DATE_PATTERN),
    };
    api
      .setPost(_id, newPostContent)
      .then((newPostData) => {
        console.log(newPostData);
      })
      .catch((err) => console.log(err));
    close();
  };

  return (
    <>
      <DialogContent>
        <Box component={"form"} onSubmit={handleSubmit(setPost)}>
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
          {getValues("image", false) ? (
            <Box
              component="img"
              src={watch("image")}
              alt="post-img"
              sx={{
                width: "30vw",
                height: "100%",
                display: "block",
                margin: "0 auto",
              }}
            ></Box>
          ) : (
            <Box
              component="img"
              src="https://b-n-c.ru/local/templates/.default/img/no-img.jpg"
              alt="no-img"
              sx={{
                width: "30vw",
                height: "100%",
                display: "block",
                margin: "0 auto",
              }}
            ></Box>
          )}

          <Controller
            name="title"
            control={control}
            rules={{required: "Обязательное поле"}}
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
              Изменить
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

export default SetPostContentForm;
