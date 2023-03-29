import React, {useState} from 'react';
import { Box } from "@mui/material";
import Comment from './../Comment/Comment';
import { Button } from '@mui/material';

function CommentList({commentList, author}) {
  
  const [newComments, setNewComments] = useState(commentList)

  return (
    <Box>
      <Button sx={{mb: 2}}>Оставить комментарий</Button>
      {
        newComments.map((comment) => <Comment key = {comment._id} {...comment}/>)
      }
    </Box>
  );
}

export default CommentList;