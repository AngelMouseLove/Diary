import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import s from "./styles.module.css";
import { Route, Routes } from "react-router-dom";
import PostPage from "../Pages/PostPage/PostPage";
import PostsPage from "../Pages/PostsPage/PostsPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import MainPage from "../Pages/MainPage/MainPage";
import { UserContext } from "../context/UserContext";
import { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
// import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import UserInfo from "../UserInfo/UserInfo";
import { useNavigate } from "react-router-dom";
import api from "../API";
import { Box } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    if (tokenFromLS) {
      api.setToken(tokenFromLS);
      setToken(tokenFromLS);
    }
  }, []);
  
  useEffect(() => {
    api.getUserInfo().then((userData) => setCurrentUser(userData)).catch((err) => console.log(err));
  }, [token]);

  const handleSearch = (term) => {
    navigate("/");
    setSearchTerm(term);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        token,
        setToken,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header>
        <Box sx={{display: "flex", width: "60vw", justifyContent: "space-between"}}>
          <Logo onClick={handleLogoClick} />
          {/* <Menu /> пока скрыла потому что конфликтует с серч баром, возможно стоит вообще убрать меню, т.к не нужно */}
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        </Box>
          {token && <UserInfo />}
        </Header>
        <main className={s.container}>
          <Routes>
            <Route index element={token ? <PostsPage searchTerm={searchTerm} /> : <MainPage />} />
            <Route path="/posts/:postId" element={token && <PostPage />} />
            <Route path="/signup" element={<MainPage />} />
            <Route path="/login" element={<MainPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
