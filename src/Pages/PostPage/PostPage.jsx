import React, { useEffect, useState } from "react";
import { Post } from "../../Post/Post";
import { useParams } from "react-router-dom";
import api from "../../API";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { checkIsLiked } from "../../utils";

function PostPage() {
  let { postId } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    api
      .getPostById(postId)
      .then((post) => setPost(post))
      .catch((err) => console.log(err));
  }, [postId, currentUser]);

  const handleLike = () => {
    api.changePostLike(post._id, checkIsLiked(post.likes, currentUser._id))
      .then((post) => setPost(post))
  }

  return (
    <>
      {post && <Post {...post} onLike={handleLike} />}
    </>
  );
}

export default PostPage;
