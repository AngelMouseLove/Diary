import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import s from './styles.module.css'
import { Route, Routes } from 'react-router-dom';
import PostPage from "../Pages/PostPage/PostPage";
import PostsPage from "../Pages/PostsPage/PostsPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";

import { UserContext } from "../context/UserContext";
import { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
// import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import UserInfo from "../UserInfo/UserInfo"
import { useNavigate } from "react-router-dom";
import api from "../API";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => setCurrentUser(userData));
  }, []);

  const handleSearch = (term) => {
    navigate("/")
    setSearchTerm(term);
  }

  const handleLogoClick = () => {
    navigate("/")
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header>
        <Logo onClick={handleLogoClick} />
        {/* <Menu /> пока скрыла потому что конфликтует с серч баром, возможно стоит вообще убрать меню, т.к не нужно */}
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <UserInfo />
        </Header>
        <div className={s.container}>
          <Routes>
            <Route index element={<PostsPage searchTerm={searchTerm} />} />
            <Route path="/posts/:postId" element={<PostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
