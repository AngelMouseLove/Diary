import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import NotFound from "../NotFound/NotFound";
import { Post } from "../Post/Post";
import { Route, Routes } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <div className="container">
        <Routes>
          <Route index element={<Main />} />

          <Route
            path="/product/:productId"
            element={<Post />}
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Post />
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
