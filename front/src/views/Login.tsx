import { useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AuthContext from "../store/authStore";

import "./Login.css";

const Login = () => {
  const ctx = useContext(AuthContext);

  return (
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
  );
};

export default Login;
