import React, {useState, useEffect} from "react";
import s from "./Post.module.css";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

export const Post = ({ image, title, text, author, created_at }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div>
          <button className={s.btn} onClick={() => navigate(-1)}>
            Назад
          </button>
        </div>
        <div className={s.wrapper}>
          <div className={s.imgWrapper}>
            <img className={s.img} src={image} alt="post_image"></img>
          </div>
          <div className={s.content}>
            <div className={s.author}>
              <div>
                <img
                  className={s.avatar}
                  src={author.avatar}
                  alt="author_avatar"
                ></img>
              </div>
              <div>
                <h3>{author.name}</h3>
                <h4>{author.about}</h4>
                <span>{created_at}</span>
              </div>
            </div>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <div>
              <b>{title}</b>
              <p>{text}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
