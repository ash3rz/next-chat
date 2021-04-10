import {
    Button,
    makeStyles,
    Paper,
    TextField,
    Typography,
    withStyles,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },

    chatBox: {
        height: "70vh",
        display: "flex",
        flexDirection: "column",
    },

    chatLog: {
        height: "100%",
        overflow: "auto",
    },

    message: {
        display: "flex",
    },

    messageBox: {
        marginTop: "auto",
    },

    messageField: {
        maxWidth: "100%",
    },
}));

function Chat(props) {
    const { chatLog, onSend } = props;
    const classes = useStyles();
    const [message, setMessage] = useState("");
    const bottomChat = useRef();

    const updateMessage = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = () => {
        onSend(message);
        setMessage("");
    };

    useEffect(() => {
        bottomChat?.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatLog]);

    return (
        <Paper classes={{ root: classes.chatBox }}>
            <Paper classes={{ root: classes.chatLog }}>
                {chatLog.map((log, index) => {
                    const Username = withStyles({
                        root: {
                            color: log.color,
                        },
                    })(Typography);
                    return (
                        <div key={index} className={classes.message}>
                            <Username>{log.username}:&nbsp;</Username>
                            <Typography>{log.message}</Typography>
                        </div>
                    );
                })}

                <div ref={bottomChat} />
            </Paper>
            <Paper classes={{ root: classes.messageBox }}>
                <TextField
                    classes={{ root: classes.messageField }}
                    variant="outlined"
                    label="Message"
                    onChange={updateMessage}
                    value={message}
                    onKeyPress={(event) => {
                        event.key === "Enter" && handleSend();
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.button }}
                    endIcon={<Send />}
                    onClick={handleSend}
                >
                    Send
                </Button>
            </Paper>
        </Paper>
    );
}

export default Chat;
