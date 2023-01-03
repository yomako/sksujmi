import { useState, useContext } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AuthContext from "./store/authStore";

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
        {!ctx.isLoggedIn && (
          <Box className="login-card">
            <h2 className="login-header">Sksujmi</h2>
            <TextField required className="login-input" label="Login" />
            <TextField required className="login-input" label="Password" />
            <div className="login-actions">
              <Button variant="contained" onClick={ctx.onLoginAsGuest}>
                Login as guest
              </Button>
              <Button variant="contained" disabled>
                Login
              </Button>
            </div>
          </Box>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
