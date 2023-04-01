import React, { useState, useEffect } from "react";
import api from "../API";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import s from "./Comment.module.css";

function Comment({
  author,
  text,
  created_at,
  _id,
  setNewComments,
  newComments,
}) {
  const [authorComment, setAuthorComment] = useState({});

  const { postId } = useParams();

  useEffect(() => {
    api
      .getUserById(author)
      .then((authorData) => setAuthorComment(authorData))
      .catch((err) => console.log(err));
  }, [author]);

  const delComment = () => {
    setNewComments(newComments.filter((c) => c._id !== newComments._id));
    api
      .delComment(postId, _id)
      .then((data) => setNewComments(data.comments))
      .catch((err) => console.log(err));
  };

  return (
    <Box>
      <hr></hr>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", m: 1 }}>
        <img
          src={authorComment.avatar}
          alt="author-avatar"
          className={s.avatar}
        ></img>
        <Box>
          <Box component={"h4"}>{authorComment.name}</Box>
          <Box component={"h5"}>{authorComment.about}</Box>
        </Box>
      </Box>
      <Box component={"b"} sx={{ display: "block", mb: 1 }}>
        {new Date(created_at).toLocaleDateString("ru-RU", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </Box>
      <Box component={"p"}>{text}</Box>
      <Button onClick={delComment} sx={{ m: "0 0 0 auto", display: "block" }}>
        <DeleteIcon />
      </Button>
    </Box>
  );
}

export default Comment;
