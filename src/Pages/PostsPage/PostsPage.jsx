import s from "./style.module.css";
import api from "../../API";
import PostCard from "../../PostCard/PostCard";
import { Grid } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import moment from "moment/moment";
import { DATE_PATTERN } from "../../constants";
import AddPost from "../../AddPost/AddPost";
import { UserContext } from "../../context/UserContext";
import { checkIsLiked } from "../../utils";
import Spinner from "../../Spinner/Spinner";
import Sort from "../../Sort/Sort";
import { PostsContext } from "../../context/PostsContent";

const tabs = [
  {
    id: "newest",
    title: "Сначала новые",
  },
  {
    id: "oldest",
    title: "Сначала старые",
  },
  {
    id: "favorites",
    title: "Сначала любимые",
  },
];

function PostsPage(props) {
  const { posts, setPosts } = useContext(PostsContext);
  const { currentUser } = useContext(UserContext);

  const [selectedTabId, setSelectedTabId] = useState("newest");

  const [isLoaded, setIsLoaded] = useState(false);

  const filteredPosts = posts?.filter((post) =>
    post.text.toLowerCase().includes(props.searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (currentUser) {
      api.getPosts().then((postsData) => {
        setPosts(postsData.filter((post) => post.author._id === currentUser._id));
        setIsLoaded(true);
      });
    }
  }, [currentUser]);

  const createPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleCardLike = (postId, isLike) => {
    api.changePostLike(postId, isLike).then((post) => {
      setPosts([...posts.filter((post) => post._id !== postId), post]);
    });
  };

  const delPost = (post) => {
    setPosts(posts.filter((p) => p._id !== post._id));
    api.delPost(post._id).catch((err) => console.log(err));
  };
  console.log(isLoaded)
  return (
    <>
      <AddPost create={createPost} />
      <Sort
        tabs={tabs}
        currentSort={selectedTabId}
        onChangeSort={(tabid) => {
          setSelectedTabId(tabid);
        }}
      />
      {isLoaded ? (
        <>
          <Grid container spacing={4} className={s.gridContainer}>
            {filteredPosts
              .sort((a, b) => {
                switch (selectedTabId) {
                  case "newest":
                    return (
                      moment(b.title, DATE_PATTERN).toDate() -
                      moment(a.title, DATE_PATTERN).toDate()
                    );
                  case "oldest":
                    return (
                      moment(a.title, DATE_PATTERN).toDate() -
                      moment(b.title, DATE_PATTERN).toDate()
                    );
                  case "favorites":
                    return (
                      b.likes.includes(currentUser._id) -
                      a.likes.includes(currentUser._id)
                      ||
                      moment(b.title, DATE_PATTERN).toDate() -
                      moment(a.title, DATE_PATTERN).toDate()
                    );
                }
              })
              .map((post) => (
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
