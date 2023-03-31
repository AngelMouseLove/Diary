import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import PostPage from "../Pages/PostPage/PostPage";
import PostsPage from "../Pages/PostsPage/PostsPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";

import { UserContext } from "../context/UserContext";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <div className="container">
          <Routes>
            <Route index element={<PostsPage />} />
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
