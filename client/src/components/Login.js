import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "../store/utils/thunkCreators";
import AuthPageImage from "./Auth/AuthPageImage";
import useAuthStyles from "./Auth/AuthStyles";

const Login = (props) => {
  const history = useHistory();

  const classes = useAuthStyles();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <AuthPageImage />
      <Grid item direction="column" md={7} alignItems="flex-start" container>
        <Box className={classes.topBox}>
          <Typography className={classes.topText} >Don't have an account?</Typography>
          <Button className={classes.topButton} onClick={() => history.push("/register")} color="primary">Create account</Button>
        </Box>
        <form onSubmit={handleLogin} className={classes.form}>
          <Typography variant="h5" style={{ fontWeight: "bold", fontSize: "1.9rem", margin: "0 0 1rem 0" }}>
            Welcome back!
          </Typography>

          <Grid>
            <FormControl margin="normal" fullWidth className={classes.formControl}>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                required
              />
            </FormControl>
          </Grid>

          <Grid>
            <FormControl
              margin="normal"
              className={classes.formControl}
              fullWidth
            >
              <TextField
                label="Password"
                aria-label="password"
                type="password"
                name="password"
                inputProps={{ minLength: 6 }}
                required
              />
            </FormControl>
          </Grid>

          <Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className={classes.submitButton}
            >
              Login
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid >
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);