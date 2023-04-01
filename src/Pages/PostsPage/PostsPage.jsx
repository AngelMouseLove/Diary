import s from "./style.module.css";
// import articles from '../data/articls.json';
import api from "../../API";
import BasicCard from "../../Card/BasicCard";
import { Grid } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import moment from "moment/moment";
import { DATE_PATTERN } from "../../constants";
import AddPost from "../../AddPost/AddPost";
import useApi from "../../useApi";
import { UserContext } from "../../context/UserContext";


function PostsPage(props) {
  const [posts, setPosts] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  // const [loading, data, error] = useApi();

  const filteredPosts = posts.filter(post => post.text.toLowerCase().includes(props.searchTerm.toLowerCase()));

  const sortCards = (a, b) => {
    return moment(b.title, DATE_PATTERN).toDate() - moment(a.title, DATE_PATTERN).toDate();
  }

  const addIsLikedToPost = (post, userId) => {
    if (post.likes.includes(userId)) {
      return { ...post, isLiked: true };
    } else {
      return { ...post, isLiked: false };
    }
  };


  useEffect(() => {
    Promise.all([api.getPosts(), api.getUserInfo()]).then(
      ([postsData, userData]) => {
        setCurrentUser(userData);
        setPosts(
          postsData
            .filter((post) => post.author._id === userData._id)
            .map((post) => addIsLikedToPost(post, userData._id))
            .sort(sortCards)
        );
      }
    );
  }, [posts]);

  const createPost = (newPost) => {
    setPosts([newPost, ...posts])
  }


  // TODO: Рефактор обновления лайка, потому что выглядит с сортировками и добавлениями параметра isLiked 
  const handleCardLike = (postId, isLike) => {
    api.changePostLike(postId, isLike).then((post) => {
      setPosts(
        [
          ...posts.filter((post) => post._id !== postId),
          addIsLikedToPost(post, currentUser._id),
        ].sort(sortCards)
      );
    });
  };

  const delPost = (post) => {
    setPosts(posts.filter((p) => p._id !== post._id));
    api
      .delPost(post._id)
      .then((postData) => {
        console.log(postData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AddPost create={createPost} />
      <Grid container spacing={4} className={s.gridContainer}>
        {filteredPosts.map((post) => (
          <Grid key={post.title} item xs={12} sm={6} md={4}>
            <BasicCard
              {...post}
              post={post}
              delPost={delPost}
              createPost={createPost}
              onLike={() => handleCardLike(post._id, post.isLiked)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default PostsPage;
