import { Popover, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Palette } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { TwitterPicker } from "react-color";
import ChatMessage from "./ChatMessage";

const useStyles = makeStyles((theme) => ({
    palette: {
        color: (props) => props.color,
    },

    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    marginTop: {
        marginTop: theme.spacing(3),
    },

    preview: {
        marginTop: theme.spacing(3),
        display: "flex",
        justifyContent: "space-between",
    },

    previewText: {
        marginTop: theme.spacing(1),
    },

    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

function SignIn(props) {
    const { onSignIn } = props;

    const [name, setName] = useState("Next Chatter");
    const [color, setColor] = useState("#FFF");
    const [popperAnchor, setPopperAnchor] = React.useState(null);

    const classes = useStyles({ color });

    const onNameChange = (event) => setName(event.target.value);
    const openPopper = (event) => setPopperAnchor(event.currentTarget);
    const closePopper = () => setPopperAnchor(null);

    const handleSignIn = () => {
        const trimmedName = name.trim();

        if (trimmedName) {
            onSignIn(name, color);
            setName("");
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            classes={{ root: classes.paper }}
        >
            <img
                src="https://robohash.org/Next-Chat?set=set1&size=100x100"
                alt="Next Chat"
            />

            <Typography variant="h5" gutterBottom paragraph>
                <b>Welcome to Next Chat!</b>
            </Typography>

            <div className={classes.form}>
                <Typography>Choose a Nickname</Typography>
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

                <div className={classes.preview}>
                    <Typography classes={{ root: classes.previewText }}>
                        Preview
                    </Typography>
                    <Button
                        onClick={openPopper}
                        startIcon={
                            <Palette classes={{ root: classes.palette }} />
                        }
                    >
                        Pick Name Color
                    </Button>
                </div>

                <ChatMessage
                    name={name}
                    color={color}
                    message="Hello everybody!"
                />

                <Popover
                    open={Boolean(popperAnchor)}
                    anchorEl={popperAnchor}
                    onClose={closePopper}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <TwitterPicker
                        color={color}
                        onChange={(color) => setColor(color.hex)}
                    />
                </Popover>

                <Button
                    classes={{ root: classes.marginTop }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSignIn}
                    disabled={name.length === 0}
                >
                    Sign In
                </Button>
            </div>
        </Container>
    );
}

export default SignIn;

SignIn.propTypes = {
    onSignIn: PropTypes.func.isRequired,
};
