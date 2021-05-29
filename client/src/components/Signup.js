import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AuthPageImage from "./Auth/AuthPageImage";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "../store/utils/thunkCreators";
import useAuthStyles from "./Auth/AuthStyles";

const Signup = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const classes = useAuthStyles();
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <AuthPageImage />
      <Grid item direction="column" md={7} alignItems="flex-start" container>
        <Box className={classes.topBox}>
          <Typography className={classes.topText} >Already have an account?</Typography>
          <Button className={classes.topButton} onClick={() => history.push("/login")} color="primary" style={{ width: "20%" }}>Login</Button>
        </Box>
        <form className={classes.form} onSubmit={handleRegister}>
          <Typography variant="h5" style={{ fontWeight: "bold", fontSize: "1.9rem", margin: "0 0 1rem 0" }}>
            Create an account.
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
            <FormControl margin="normal" fullWidth className={classes.formControl}>
              <TextField
                aria-label="email"
                label="E-mail address"
                name="email"
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

          <Grid>
            <FormControl
              margin="normal"
              className={classes.formControl}
              fullWidth
            >
              <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
