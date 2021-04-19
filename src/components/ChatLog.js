import { List, makeStyles, Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

const useStyles = makeStyles((theme) => ({
    chatLog: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        height: "100%",
        overflow: "auto",
    },
}));

function ChatLog(props) {
    const { chatLog } = props;
    const classes = useStyles();
    const bottomChat = useRef();

    useEffect(() => {
        bottomChat?.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatLog]);

    return (
        <Paper elevation={2} classes={{ root: classes.chatLog }}>
            <List>
                {chatLog.map((log, index) => {
                    return <ChatMessage key={index} {...log} />;
                })}
                <div ref={bottomChat} />
            </List>
        </Paper>
    );
}

export default ChatLog;

ChatLog.propTypes = {
    chatLog: PropTypes.array.isRequired,
};
