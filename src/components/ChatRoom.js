import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatLog from "./ChatLog";
import Toolbar from "./Toolbar";
import Users from "./Users";

const useStyles = makeStyles((theme) => ({
    chatBox: {
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },

    toolbarPadding: {
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },

    root: {
        display: "flex",
    },
}));

function ChatRoom(props) {
    const { chatLog, users, onSend, onUpdateTyping, onSignOut } = props;
    const classes = useStyles();

    const [usersExpanded, setUsersExpanded] = useState(true);
    const handleUsersExpanded = () => setUsersExpanded(true);
    const handleUsersMini = () => setUsersExpanded(false);

    return (
        <div className={classes.root}>
            <Toolbar
                usersExpanded={usersExpanded}
                handleUsersExpanded={handleUsersExpanded}
                onSignOut={onSignOut}
            />
            <Users
                users={users}
                expanded={usersExpanded}
                handleUsersMini={handleUsersMini}
            />
            <div className={classes.chatBox}>
                <div className={classes.toolbarPadding} />
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
    onSignOut: PropTypes.func.isRequired,
};
