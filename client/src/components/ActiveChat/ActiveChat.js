import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { setMessagesRead } from "../../store/utils/thunkCreators";


const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    height: "100vh",
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  },
  input: {
    marginTop: "auto",
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};
  const [lastReadIndex, setLastReadIndex] = useState(0);
  var messagesEnd;

  useEffect(() => {
    let conversations = props.conversation;
    let hasUnreadMessage = false;
    if (conversations && conversations.messages) {
      for (let i = conversations.messages.length - 1; i >= 0; i--) {
        if (!conversations.messages[i].isRead && conversations.messages[i].senderId === conversations.otherUser.id) {
          hasUnreadMessage = true;
        }
        if (conversations.messages[i].isRead && conversations.messages[i].senderId === user.id) {
          setLastReadIndex(conversations.messages[i].id);
          break;
        }
      }
    }
    if (hasUnreadMessage) {
      async function messageRead() {
        await props.setMessagesRead({
          conversationId: props.conversation.id,
          senderId: props.conversation.otherUser.id,
          recipientId: user.id
        });
      }
      if (conversations && conversations.otherUser && conversations.id) {
        messageRead();
      }
    }

    messagesEnd.scrollIntoView({ behavior: "smooth" });

  }, [setLastReadIndex, props, user, messagesEnd]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              lastReadIndex={lastReadIndex}
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              className={classes.input}
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
      <div style={{ float: "left", clear: "both" }}
        ref={(el) => { messagesEnd = el; }}>
      </div>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
    {
      ...(state.conversations &&
        state.conversations.find(
          (conversation) => conversation.otherUser.username === state.activeConversation
        ))
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMessagesRead: (body) => {
      dispatch(setMessagesRead(body));
    },
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
