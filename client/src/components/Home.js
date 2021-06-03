import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline, makeStyles, Box } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { fetchConversations } from "../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    height: "97vh",
    '@media(max-width: 1000px)': {
      direction: "column",
    }
  },
  sidebarContainer: {
    position: "fixed",
    width: "20vw",
    height: "100%",
    overflowY: "scroll",
    '@media(max-width: 1000px)': {
      position: "relative",
      width: "100%",
      height: "45%",
      overflowY: "scroll"
    }

  },
  activeChat: {
    width: "80vw",
    marginLeft: "20vw",
    height: "100%",
    position: "relative",
    '@media(max-width: 1000px)': {
      width: "100%",
      marginLeft: "0",
      position: "relative",
      marginTop: 20,
      height: "100%",
      overflowY: "scroll"
    }
  }

}));



const Home = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { fetchConversations } = props;
  const classes = useStyles();
  const prevId = usePrevious(props.user.id);


  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    if (props.user.id !== prevId) {
      setIsLoggedIn(true);
    }
  }, [props.user.id, prevId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return (
    !props.user.id ? isLoggedIn ? <Redirect to="/login" /> : <Redirect to="/register" /> :
      <>
        <Grid container component="main" className={classes.root} >
          <CssBaseline />
          <Box className={classes.sidebarContainer}>
            <SidebarContainer />
          </Box>
          <Box className={classes.activeChat}>
            <ActiveChat />
          </Box>
        </Grid>
      </>
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
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
