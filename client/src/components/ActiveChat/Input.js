import React, { useState } from "react";
import { FormControl, FilledInput, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { postMessage, isTyping } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");


  const handleChange = async (event) => {
    setText(event.target.value);
    if (event.target.value.length === 0) {
      await props.isTyping({ recipientId: props.otherUser.id, senderId: props.user.id, value: false });
    } else {
      await props.isTyping({ recipientId: props.otherUser.id, senderId: props.user.id, value: true });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.isTyping({ recipientId: props.otherUser.id, senderId: props.user.id, value: false });
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: props.otherUser.id,
      conversationId: props.conversationId,
      sender: props.conversationId ? null : props.user,
    };
    await props.postMessage(reqBody);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
    isTyping: (body) => {
      dispatch(isTyping(body));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);
