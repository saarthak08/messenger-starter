import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },

  },
  circle: {
    width: "22px",
    height: "22px",
    lineHeight: "22px",
    borderRadius: "50%",
    color: "white",
    fontSize: "15px",
    textAlign: "center",
    background: "#3A8DFF"
  }
}));

const Chat = (props) => {
  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
  };

  const classes = useStyles();
  const otherUser = props.conversation.otherUser;
  return (
    <Box
      onClick={() => handleClick(props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} />
      {props.unreadMessagesCount && props.unreadMessagesCount !== 0 && <Box className={classes.circle}>{props.unreadMessagesCount}</Box>}
    </Box>
  );

}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};


export default connect(null, mapDispatchToProps)((Chat));
