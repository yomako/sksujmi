import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

import "./ConversationOverview.css";

const ConversationOverview = () => {
  return (
    <div className="conversation-overview-section">
      <Paper className="conversation-overview-paper" elevation={10}>
        <div className="conversation-overview-content">
          <div className="conversation-message">
            <Paper elevation={15}>kiedy więcej ksucia?</Paper>
          </div>
        </div>
        <div className="conversation-overview-bottom">
          <Paper className="new-message-paper" elevation={5}>
            <Input className="new-message-content" placeholder="Aa" />
          </Paper>
          <Button className="new-message-send-button" variant="contained">
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default ConversationOverview;
