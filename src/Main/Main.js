import s from "../Main/style.module.css";
// import articles from '../data/articls.json';
import api from "../API";
import BasicCard from "../Card/BasicCard";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import moment from "moment/moment";
import { DATE_PATTERN } from "../constants";
import AddPost from "../AddPost/AddPost";

function Main() {
  const [currentUser, setCurrentUser] = useState({});
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    Promise.all([api.getPosts(), api.getUserInfo()]).then(
      ([postsData, userData]) => {
        setCurrentUser(userData);
        setPosts(
          postsData
            .filter((post) => post.author._id === userData._id)
            .sort(
              (a, b) =>
                moment(b.title, DATE_PATTERN).toDate() -
                moment(a.title, DATE_PATTERN).toDate()
            )
        );
      }
    );
  }, []);

  const createPost = (newPost) => {
    setPosts([newPost, ...posts])
  }

  const delPost = (post) => {
    setPosts(posts.filter(p => p._id !== post._id))
    api.delPost(post._id)
    .then((postData) => {console.log(postData)})
    .catch(err => console.log(err))
  }

  return (
    <>
      <AddPost create={createPost}/>
      <Grid container spacing={4} className={s.gridContainer}>
        {posts.map((post) => (
          <Grid key={post.title} item xs={12} sm={6} md={4}>
            <BasicCard {...post} post={post} delPost={delPost} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Main;
