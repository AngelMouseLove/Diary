import React, { useState } from "react";
import { Button } from "@mui/material";
import { Dialog } from "@mui/material";
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
      <Button variant="contained" onClick={handleOpen}>
        Сделать запись
      </Button>
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
