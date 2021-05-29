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
  makeStyles,
} from "@material-ui/core";
import { login } from "../store/utils/thunkCreators";
import AuthPageImage from "./AuthPageImage";


const useStyles = makeStyles((theme) => ({
  root: {
    direction: "row",
    height: "100vh"
  },
  registerBox: {
    display: "flex",
    color: "grey",
    width: "90%",
    margin: "2rem 0",
    justifyContent: "flex-end",
  },
  registerText: {
    marginRight: "2rem",
    padding: "1rem 0 0 2rem",
  },
  registerButton: {
    fontSize: "1rem",
    boxShadow: "0px 2px 12px  #c9d5e5",
    padding: "1rem 2rem",
  },

  formLogin: {
    width: "70%",
    margin: "auto auto",
  },
  submitButton: {
    display: "flex",
    margin: "2rem auto",
    padding: "1rem",
    width: "10rem",
    fontWeight: "bolder",
  },
  formControl: {
    width: "90%",
    margin: "1.8rem auto",
  },
  label: {
    fontWeight: "bold",
    "& .Mui-focused": {
      color: "#bab8b8",
      fontSize: "1.3rem",
      fontWeight: "bold"
    }
  },
}));

const Login = (props) => {
  const history = useHistory();
  const classes = useStyles();
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
        <Box className={classes.registerBox}>
          <Typography className={classes.registerText} >Don't have an account?</Typography>
          <Button className={classes.registerButton} onClick={() => history.push("/register")} color="primary">Create account</Button>
        </Box>
        <form onSubmit={handleLogin} className={classes.formLogin}>
          <Typography variant="h5" style={{ fontWeight: "bold", fontSize: "1.9rem" }}>
            Welcome back!
          </Typography>

          <Grid>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                aria-label="email"
                label="E-mail address"
                name="email"
                type="text"
                className={classes.label}
                InputLabelProps={{ classes: { root: classes.label } }}
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
                className={classes.label}
                InputLabelProps={{ classes: { root: classes.label } }}
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