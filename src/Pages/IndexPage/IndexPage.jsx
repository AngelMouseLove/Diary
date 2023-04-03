import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import PostsPage from '../PostsPage/PostsPage';
import MainPage from '../MainPage/MainPage';

function IndexPage({searchTerm}) {
  const { token } = useContext(UserContext);
  if (token) {
    return <PostsPage searchTerm={searchTerm}/>;
  }

  return <MainPage />;
}

export default IndexPage;