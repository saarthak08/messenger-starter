import React from "react";
import backgroundImage from "../images/bg-img.png";
import chatBubble from "../images/bubble.svg";
import {
    Grid,
    Box,
    Typography,
    makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        backgroundImage: `linear-gradient(to bottom, rgba(58,141,255,0.85) 0%,rgba(134,185,255,0.85) 100%), url('${backgroundImage}')`,
        backgroundSize: "cover",
        direction: "column",
        display: "flex",
        justify: "center",
        alignItems: "center",
    },
    mainText: {
        color: "white",
        fontSize: "2rem",
        variant: "h5",
        textAlign: "center",
        whiteSpace: "pre-line",
        fontWeight: "bold",
    },
    box: {
        margin: "10% 15%"
    },
    chatBubble: {
        margin: "0% 0% 10% 35%",
    }
}));

const AuthPageImage = () => {
    const classes = useStyles();
    return (
        <Grid className={classes.root} md={5} container item  >
            <Box className={classes.box}>
                <Grid direction="column" item >
                    <img alt="chatBubble" src={chatBubble} className={classes.chatBubble} />
                    <Typography
                        className={classes.mainText}>
                        Converse with anyone{"\n"} with any language
                    </Typography>
                </Grid>
            </Box>
        </Grid>
    );
}

export default AuthPageImage;