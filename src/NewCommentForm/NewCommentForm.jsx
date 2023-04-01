import React from 'react';
import { DialogContent, Box, Button, TextField, DialogActions, DialogTitle } from '@mui/material';
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { commenTextValidation } from "../validation";
import api from '../API';
import { useParams } from 'react-router';

function NewCommentForm({close, create, setNewComments}) {

  let { postId } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {text: ""},
  });

  const addNewComment = (comment) => {
    api
      .createComment(postId, comment)
      .then((data) => {
        create(data);
        setNewComments(data.comments)
      })
      .catch((err) => console.log(err))
    reset()
    close()
  }

  return (
    <>
      <DialogTitle>Новый комментарий</DialogTitle>
      <DialogContent >
        <Box component={"form"} onSubmit={handleSubmit(addNewComment)} >
          <Controller
            name="text"
            control={control}
            rules={commenTextValidation}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Ваш комментарий"
                size="medium"
                margin="normal"
                fullWidth
                multiline
                minRows={8}
                value={value}
                onChange={(e) => onChange(e)}
                error={!!errors.text?.message}
                helperText={errors.text?.message}
              />
            )}
          />
          <DialogActions>
            <Button type="submit" variant="contained" sx={{ mt: "15px" }}>
              Оппубликовать комментарий
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

export default NewCommentForm;