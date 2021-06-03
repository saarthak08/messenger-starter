import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline, Button, makeStyles } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";

const useStyles = makeStyles(() => ({
  root: {
    height: "97vh",
  },
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

  const handleLogout = async () => {
    await props.logout(props.user.id);
  };

  return (
    !props.user.id ? isLoggedIn ? <Redirect to="/login" /> : <Redirect to="/register" /> :
      <>
        {/* logout button will eventually be in a dropdown next to username */}
        <Button className={classes.logout} onClick={handleLogout}>
          Logout
        </Button>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <SidebarContainer />
          <ActiveChat />
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
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
