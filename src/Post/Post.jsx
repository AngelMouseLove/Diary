import React, { useState } from "react";
import s from "./Post.module.css";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import api from './../API'

export const Post = ({ post, setPost }) => {
  
  
  
  // const postInfo = api.getPostById(post._id).then((data) => setPost(data)).catch((err) => console.log(err))
  // console.log(postInfo)
  return (
    <div>
      <div>
        <div>
          <button className={s.btn}>Назад</button>
        </div>
        <div className={s.wrapper}>
          <div>
            <img className={s.img} src='' alt=""></img>
          </div>
          <div className={s.content}>
            <div className={s.author}>
              <div>
                <img className={s.avatar} src="" alt=""></img>
              </div>
              <div>
                <h3>Автор</h3>
                <span>Дата публикации</span>
              </div>
            </div>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <div>
              <b>Заголовок поста</b>
              <p>Текст поста</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
