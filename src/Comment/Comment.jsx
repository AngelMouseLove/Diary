import React, { useState, useEffect } from "react";
import api from "../API";
import { Box } from "@mui/material";
import s from "./Comment.module.css";

function Comment({ author, text, created_at }) {
  const [authorComment, setAuthorComment] = useState({});

  useEffect(() => {
    api
      .getUserById(author)
      .then((authorData) => setAuthorComment(authorData))
      .catch((err) => console.log(err));
  }, [author]);

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
          minute: "numeric"
        })}
      </Box>
      <Box component={"p"}>{text}</Box>
    </Box>
  );
}

export default Comment;
