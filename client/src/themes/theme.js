import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans -semibold, regular, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "black"
      },
    },
    MuiInputLabel: {
      root: {
        color: "#828282",
        fontSize: "1.2rem",
        margin: "-0.8rem 0",
        "&$focused": {
          fontSize: "1.3rem",
          color: "#828282"
        }
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" }
  }
});
