import React, { useState } from "react";
import { Box } from "@mui/material";
import Comment from "./../Comment/Comment";
import NewCommentForm from "../NewCommentForm/NewCommentForm";
import { Button, Dialog } from "@mui/material";

function CommentList({ commentList }) {
  const [newComments, setNewComments] = useState(commentList);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createComment = (newComment) => {
    setNewComments([...commentList, newComment]);
  };

  return (
    <Box>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleOpen}>
        Оставить комментарий
      </Button>
      {newComments.map((comment) => (
        <Comment
          key={comment._id}
          {...comment}
          setNewComments={setNewComments}
          newComments={newComments}
        />
      ))}
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <NewCommentForm
          close={handleClose}
          create={createComment}
          setNewComments={setNewComments}
        />
      </Dialog>
    </Box>
  );
}

export default CommentList;
