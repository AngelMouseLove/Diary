import s from "./style.module.css";
// import articles from '../data/articls.json';
import api from "../../API";
import PostCard from "../../Card/PostCard";
import { Grid } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import moment from "moment/moment";
import { DATE_PATTERN } from "../../constants";
import AddPost from "../../AddPost/AddPost";
// import useApi from "../../useApi";
import { UserContext } from "../../context/UserContext";
import { checkIsLiked } from "../../utils";
import Spinner from "../../Spinner/Spinner";

function PostsPage(props) {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(UserContext);

  const filteredPosts = posts.filter((post) =>
    post.text.toLowerCase().includes(props.searchTerm.toLowerCase())
  );

  const sortCards = (a, b) => {
    return (
      moment(b.title, DATE_PATTERN).toDate() -
      moment(a.title, DATE_PATTERN).toDate()
    );
  };

  useEffect(() => {
    api.getPosts().then((postsData) => {
      setPosts(
        postsData
          .filter((post) => post.author._id === currentUser._id)
          .sort(sortCards)
      );
    });
  }, [currentUser]);

  const createPost = (newPost) => {
    setPosts([newPost, ...posts].sort(sortCards));
  };

  const handleCardLike = (postId, isLike) => {
    api.changePostLike(postId, isLike).then((post) => {
      setPosts(
        [...posts.filter((post) => post._id !== postId), post].sort(sortCards)
      );
    });
  };

  const delPost = (post) => {
    setPosts(posts.filter((p) => p._id !== post._id));
    api
      .delPost(post._id)

      .catch((err) => console.log(err));
  };

  return (
    <>
      <AddPost create={createPost} />
      {!!filteredPosts.length ? (
        <>
          <Grid container spacing={4} className={s.gridContainer}>
            {filteredPosts.map((post) => (
              <Grid
                key={post.title}
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "stretch" }}
              >
                <PostCard
                  {...post}
                  post={post}
                  delPost={delPost}
                  createPost={createPost}
                  onLike={() =>
                    handleCardLike(
                      post._id,
                      checkIsLiked(post.likes, currentUser._id)
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default PostsPage;
