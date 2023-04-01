import React from "react";
import s from "./Post.module.css";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";
import { DATE_PATTERN } from "../constants";
import CommentList from "../CommentList/CommentList";
import LikeButton from "../LikeButton/LikeButton";

export const Post = ({ image, title, text, author, comments, isLiked, onLike }) => {
  
  const navigate = useNavigate();

  const handleLike = () => {
    onLike();
  }

  return (
    <div>
      <div>
        <div>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Назад
          </Button>
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
              </div>
            </div>
            <LikeButton isLiked={isLiked} onClick={handleLike} />
            <div className={s.postContent}>
              <p>
                <b>
                  {moment(title, DATE_PATTERN).format("Do MMMM YYYY, dddd")}
                </b>
              </p>
              <p>{text}</p>
            </div>
            <Box>
              <CommentList commentList={comments} />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
