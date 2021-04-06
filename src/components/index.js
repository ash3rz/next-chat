import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

function getRandomColor() {
    const rgbValue = () => Math.floor(Math.random() * 256);

    return `rgb(${rgbValue()}, ${rgbValue()}, ${rgbValue()})`;
}

function SignIn(props) {
    const { onSignIn } = props;
    const classes = useStyles();

    const [name, setName] = useState("");
    const onNameChange = (event) => setName(event.target.value);

    const handleSignIn = () => {
        const trimmedName = name.trim();

        if (trimmedName) {
            const color = rgbToHex(getRandomColor());
            console.log("color was", color);
            onSignIn(name, color);
            setName("");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography variant="h5">Welcome to Next Chat!</Typography>
                <Typography variant="h6">Choose a Nickname</Typography>
                <div className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nickname"
                        label="Nickname"
                        autoComplete="nickname"
                        autoFocus
                        onKeyPress={(event) => {
                            event.key === "Enter" && handleSignIn();
                        }}
                        value={name}
                        onChange={onNameChange}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default SignIn;