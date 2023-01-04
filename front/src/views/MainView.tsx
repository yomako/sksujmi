import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Conversations from "../components/Conversations";

import "./MainView.css";
import ConversationOverview from "../components/ConversationOverview";

const MainView = () => {
  return (
    <Box className="main-card">
      <AppBar position="static">
        <Toolbar>
          <Typography
            className="header-sksujmi"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Sksujmi
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className="main-section">
        <Conversations />
        <ConversationOverview />
      </div>
    </Box>
  );
};

export default MainView;
