import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "./App.css";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div className="container">
      <Header />  
      <Main />
      <Footer />
    </div>
    </ThemeProvider>
  );
}

export default App;
