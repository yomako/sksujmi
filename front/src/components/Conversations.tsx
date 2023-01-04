import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "./Conversations.css";

interface ConversationDemo {
  ID: string;
  title: string;
  lastSpeaker: string;
  lastMessageContent: string;
}

const Conversations = () => {
  const conversations: Array<ConversationDemo> = [
    {
      ID: "uhu33ue3i2p",
      title: "Sławek, Tomek",
      lastSpeaker: "Tomek",
      lastMessageContent: "kiedy więcej ksucia?",
    },
    {
      ID: "8093ji4po",
      title: "Project Sksujmi Team",
      lastSpeaker: "Tomek",
      lastMessageContent: "czemu nie commitujesz?",
    },
  ];

  return (
    <div className="conversations-section">
      <List className="conversations-list" sx={{ bgcolor: "background.paper" }}>
        {conversations.map((conv) => (
          <>
            <ListItem key={conv.ID} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{conv.title.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={conv.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {conv.lastSpeaker + " - "}
                    </Typography>
                    {conv.lastMessageContent}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
      <div className="new-conversation-section">
        <Button
          className="new-conversation-button"
          variant="outlined"
          startIcon={<AddIcon />}
        >
          New conversation
        </Button>
      </div>
    </div>
  );
};

export default Conversations;
