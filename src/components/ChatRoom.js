import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import ChatInput from "./ChatInput";
import ChatLog from "./ChatLog";
import Users from "./Users";

const useStyles = makeStyles(() => ({
    chatBox: {
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },

    root: {
        display: "flex",
    },
}));

function ChatRoom(props) {
    const { chatLog, users, onSend, onUpdateTyping } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Users users={users} />
            <div className={classes.chatBox}>
                <ChatLog chatLog={chatLog} />
                <ChatInput onSend={onSend} onUpdateTyping={onUpdateTyping} />
            </div>
        </div>
    );
}

export default ChatRoom;

ChatRoom.propTypes = {
    chatLog: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    onSend: PropTypes.func.isRequired,
    onUpdateTyping: PropTypes.func.isRequired,
};
