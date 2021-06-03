import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { setMessagesRead } from "../../store/utils/thunkCreators";


const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    height: "100%",
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
  },
  header: {
    height: "100%",
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user, setMessagesRead } = props;
  const [lastReadIndex, setLastReadIndex] = useState(0);
  const messagesEnd = useRef();
  const conversation = useMemo(() => props.conversation || {}, [props.conversation]);


  useEffect(() => {
    let hasUnreadMessage = false;
    if (conversation && conversation.messages) {
      for (let i = conversation.messages.length - 1; i >= 0; i--) {
        if (!conversation.messages[i].isRead && conversation.messages[i].senderId === conversation.otherUser.id) {
          hasUnreadMessage = true;
        }
        if (conversation.messages[i].isRead && conversation.messages[i].senderId === user.id) {
          setLastReadIndex(conversation.messages[i].id);
          break;
        }
      }
    }
    if (hasUnreadMessage) {
      async function messageRead() {
        await setMessagesRead({
          conversationId: conversation.id,
          senderId: conversation.otherUser.id,
          recipientId: user.id
        });
      }
      if (conversation && conversation.otherUser && conversation.id) {
        messageRead();
      }
    }

    if (messagesEnd) {
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

  }, [user, messagesEnd, conversation, setMessagesRead]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Box className={classes.header}
          >
            <Header
              username={conversation.otherUser.username}
              online={conversation.otherUser.online || false}
            />
          </Box>
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
      <Box ref={messagesEnd} />
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
