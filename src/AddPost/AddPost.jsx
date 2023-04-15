import React, { useState } from "react";
import { Button, Box, Dialog } from "@mui/material";
import NewPostForm from "../NewPostForm/NewPostForm";

function AddPost({ create }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Box component="p" sx={{mr: "10vw"}}>
        Ведите свой дневник. <br></br> Создавайте посты с&nbsp;воспоминаниями, читайте посты, делайте комментарии к&nbsp;записям. <br></br> Вы&nbsp;можете лайкнуть записи, редактировать или удалить запись.
        </Box>
        <Box>
          <Button variant="contained" onClick={handleOpen}>
            Сделать запись
          </Button>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        scroll="body"
      >
        <NewPostForm create={create} close={handleClose} />
      </Dialog>
    </>
  );
}

export default AddPost;
