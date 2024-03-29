import React, { useEffect, useState } from "react";
import { Post } from "../../Post/Post";
import { useParams } from "react-router-dom";
import api from "../../API";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { checkIsLiked } from "../../utils";
import Spinner from "../../Spinner/Spinner";

function PostPage() {
  let { postId } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    api
      .getPostById(postId)
      .then((post) => setPost(post))
      .catch((err) => console.log(err));
  }, [postId]);

  const handleLike = () => {
    api
      .changePostLike(post._id, checkIsLiked(post.likes, currentUser._id))
      .then((post) => setPost(post));
  };

  return <>{post ? <Post {...post} onLike={handleLike} /> : <Spinner />}</>;
}

export default PostPage;
