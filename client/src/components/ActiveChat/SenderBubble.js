import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginTop: 10
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  readText: {
    fontSize: 12,
    fontWeight: "bold",
    paddingRight: 8,
    paddingLeft: 8
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  avatar: {
    height: 15,
    width: 15,
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, otherUser } = props;
  const [isReadShown, setIsReadShown] = useState(false);

  const handleClick = (event) => {
    setIsReadShown(!isReadShown);
  };

  return (
    <Box className={classes.root} onClick={handleClick}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
        {isReadShown && <Typography className={classes.readText}>Read: {props.isRead ? "Yes" : "No"} </Typography>}
        {isReadShown && props.isRead && <Typography className={classes.readText}>Read Time: {Date(props.readTime).toString("MMM dd")}</Typography>}
      </Box>
      {props.id === props.lastReadIndex && <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>}
    </Box>
  );
};

export default SenderBubble;
