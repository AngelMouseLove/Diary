import s from "./style.module.css";
import api from "../../API";
import PostCard from "../../PostCard/PostCard";
import { Grid } from "@mui/material";
import { useEffect, useContext } from "react";
import moment from "moment/moment";
import { DATE_PATTERN } from "../../constants";
import AddPost from "../../AddPost/AddPost";
import { UserContext } from "../../context/UserContext";
import { SortContext } from "../../context/SortContext";
import { checkIsLiked } from "../../utils";
import Spinner from "../../Spinner/Spinner";
import Sort from "../../Sort/Sort";

const tabs = [
  {
    id: "newest",
    title: "Сначала новые",
  },
  {
    id: "oldest",
    title: "Сначала старые",
  },
];

function PostsPage(props) {
  const { posts, setPosts } = useContext(UserContext);
  const { currentUser } = useContext(UserContext);

  const { selectedTabId, setSelectedTabId } = useContext(SortContext);

  const filteredPosts = posts.filter((post) =>
    post.text.toLowerCase().includes(props.searchTerm.toLowerCase())
  );

  useEffect(() => {
    api.getPosts().then((postsData) => {
      setPosts(postsData.filter((post) => post.author._id === currentUser._id));
    });
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
      {!!filteredPosts.length ? (
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
