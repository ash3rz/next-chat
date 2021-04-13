import { makeStyles, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
    chatInput: {
        paddingTop: theme.spacing(2),
        marginTop: "auto",
    },
}));

function ChatInput(props) {
    const { onSend, onUpdateTyping } = props;
    const [message, setMessage] = useState("");
    const [isTyping, setTyping] = useState(false);
    const [typingTimer, setTypingTimer] = useState(null);

    const classes = useStyles();

    const updateMessage = (event) => {
        setMessage(event.target.value);
        
        setTyping(true);
        clearTimeout(typingTimer);
        const timer = setTimeout(() => {
            setTyping(false);
        }, 2000);
        setTypingTimer(timer);
    };

    const handleSend = () => {
        const msg = message.trim();

        if (msg.length > 0) {
            onSend(message);
            setMessage("");
            setTyping(false);
        }
    };

    useEffect(() => {
        onUpdateTyping(isTyping);
    }, [isTyping]);

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
    onUpdateTyping: PropTypes.func.isRequired,
};
