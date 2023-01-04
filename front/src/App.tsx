import { useContext } from "react";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import AuthContext from "./store/authStore";
import Login from "./views/Login";
import MainView from "./views/MainView";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const ctx = useContext(AuthContext);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <MainView />}
      </ThemeProvider>
    </div>
  );
}

export default App;
