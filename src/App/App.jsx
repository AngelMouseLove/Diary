import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "./App.css";
import NotFound from "../NotFound/NotFound";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <div className="container">
        <Main />
    <NotFound/>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
