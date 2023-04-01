import React, { useEffect, useState } from "react";
import { Post } from "../../Post/Post";
import { useParams } from "react-router-dom";
import api from "../../API";
import { addIsLikedToPost } from "../../likeHelper";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function PostPage() {
  let { postId } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    api
      .getPostById(postId)
      .then((post) => setPost(addIsLikedToPost(post, currentUser._id)))
      .catch((err) => console.log(err));
  }, [postId, currentUser]);

  const handleLike = () => {
    api.changePostLike(post._id, post.isLiked)
      .then((post) => setPost(addIsLikedToPost(post, currentUser._id)))
  }

  return (
    <div>
      {post && <Post {...post} onLike={handleLike} />}
    </div>
  );
}

export default PostPage;
