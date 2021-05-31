import { makeStyles } from '@material-ui/core';

const useAuthStyles = makeStyles((theme) => ({
    root: {
        direction: "row",
        height: "100vh"
    },
    topBox: {
        display: "flex",
        color: "grey",
        width: "90%",
        margin: "2rem 0",
        justifyContent: "flex-end",
    },
    topText: {
        marginRight: "2rem",
        padding: "1rem 0 0 2rem",
    },
    topButton: {
        fontSize: "1rem",
        boxShadow: "0px 2px 12px  #c9d5e5",
        padding: "1rem 2rem",
    },

    form: {
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
        margin: "1.2rem auto",
    },
}));
export default useAuthStyles;