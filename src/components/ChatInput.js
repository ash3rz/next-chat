import { makeStyles, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    chatInput: {
        paddingTop: theme.spacing(2),
        marginTop: "auto",
    },
}));

function ChatInput(props) {
    const { onSend } = props;
    const [message, setMessage] = useState("");

    const classes = useStyles();

    const updateMessage = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = () => {
        const msg = message.trim();

        if (msg.length > 0) {
            onSend(message);
            setMessage("");
        }
    };

    return (
        <div className={classes.chatInput}>
            <TextField
                fullWidth
                variant="outlined"
                label="Message"
                onChange={updateMessage}
                value={message}
                onKeyPress={(event) => {
                    event.key === "Enter" && handleSend();
                }}
            />
        </div>
    );
}

export default ChatInput;

ChatInput.propTypes = {
    onSend: PropTypes.func.isRequired,
};
