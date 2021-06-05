import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("hh:mm A");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} lastReadIndex={props.lastReadIndex} otherUser={props.otherUser} id={message.id} isRead={message.isRead} readTime={message.readTime} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
      {props.isTyping && props.isTyping.value && <OtherUserBubble key="typing" text="Typing..." otherUser={otherUser} />
      }
    </Box>
  );
};

const mapStateToProps = (state, props) => {
  return {
    isTyping: state.user.isTyping && state.user.isTyping[props.otherUser.id],
    conversation:
    {
      ...(state.conversations &&
        state.conversations.find(
          (conversation) => conversation.otherUser.username === state.activeConversation
        ))
    }
  };
};

export default connect(mapStateToProps)(Messages);
