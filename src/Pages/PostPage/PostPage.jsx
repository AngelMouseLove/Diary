import React, { useEffect, useState } from "react";
import { Post } from "../../Post/Post";
import { useParams } from "react-router-dom";
import api from "../../API";

function PostPage() {
  let { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api
      .getPostById(postId)
      .then((post) => setPost(post))
      .catch((err) => console.log(err));
  }, [postId]);

  return (
    <div>
      {post && <Post {...post} />}
    </div>
  );
}

export default PostPage;
