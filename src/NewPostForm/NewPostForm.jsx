import React from "react";
import { Box, TextField, Button } from "@mui/material";
import api from "../API";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import s from './NewPostForm.module.css'


function NewPostForm({ create }) {
  
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch
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
    
    const newPost = {...post, tags: post.tags.split(', ')}
    
    api
      .createPost(newPost)
      .then((postData) => {
        create(postData)
      })
      .catch((err) => console.log(err));
    reset();
  };
  
  return (
    <Box
      sx={{
        position: "absolute",
        top: "75%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '60vw',
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        textAlign: "center"
      }}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(addNewPost)}
    >
      <Controller
        name="image"
        control={control}
        rules={{ required: "Обязательное поле" }}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Картинка воспоминания (URL)"
            size="medium"
            margin="normal"
            fullWidth
            value={value}
            onChange={(e) => onChange(e)}
          />
        )}
      />
      { watch("image", false)
        ? 
          <img src={watch('image')} alt='post-img' className={s.img}></img>
        : <img src="https://b-n-c.ru/local/templates/.default/img/no-img.jpg" alt='no-img' className={s.img}></img> 
      }
      
        
      <Controller
        name="title"
        control={control}
        rules={{ required: "Обязательное поле" }}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Введите дату события"
            size="medium"
            margin="normal"
            fullWidth
            value={value}
            onChange={(e) => onChange(e)}
          />
        )}
      />

      <Controller
        name="text"
        control={control}
        rules={{ required: "Обязательное поле" }}
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
          />
        )}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Ключевые слова"
            size="medium"
            margin="normal"
            fullWidth
            value={value}
            onChange={(e) => onChange(e)}
          />
        )}
      />

      <Button type="submit" sx={{mt:"15px"}}>Записать</Button>
    </Box>
  );
}

export default NewPostForm;
