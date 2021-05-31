import React from "react";
import {
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core";
import backgroundImage from "../../images/bg-img.png";
import chatBubble from "../../images/bubble.svg";

const useStyles = makeStyles(() => ({
    root: {
        backgroundImage: `linear-gradient(to bottom, rgba(58,141,255,0.85) 0%,rgba(134,185,255,0.85) 100%), url('${backgroundImage}')`,
        backgroundSize: "cover",
        direction: "column",
    },
    mainText: {
        color: "white",
        fontSize: "2rem",
        variant: "h5",
        textAlign: "center",
        whiteSpace: "pre-line",
        fontWeight: "bold",
        margin: "5% 0% 25% 0"
    },


}));

const AuthPageImage = () => {
    const classes = useStyles();
    return (
        <Grid md={5} container item className={classes.root}  >
            <Grid item container direction="column" display="flex" justify="center" alignItems="center" style={{ margin: "10% 0 0 0" }}>
                <img alt="chatBubble" src={chatBubble} className={classes.chatBubble} />
                <Typography
                    className={classes.mainText}>
                    Converse with anyone{"\n"} with any language
                </Typography>
            </Grid>
        </Grid>
    );
}

export default AuthPageImage;