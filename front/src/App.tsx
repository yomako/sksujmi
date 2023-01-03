import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Box className="login-card">
          <h2 className="login-header">Sksujmi</h2>
          <TextField required className="login-input" label="Login" />
          <TextField required className="login-input" label="Password" />
          <div className="login-actions">
            <Button variant="contained">Login as guest</Button>
            <Button variant="contained" disabled>
              Login
            </Button>
          </div>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
