import React, {useState} from 'react';
import { Button } from "@mui/material"
import { Modal } from "@mui/material";
import NewPostForm from '../NewPostForm/NewPostForm';

function AddPost({create}) {
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
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          overflowY: "scroll",
        }}
      >
        <NewPostForm create={create} ref />
      </Modal>
    </>
  );
}

export default AddPost;