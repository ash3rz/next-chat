import {
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Paper,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

const useStyles = makeStyles((theme) => ({
    chatLog: {
        height: "100%",
        overflow: "auto",
    },

    listItem: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: 0,
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
        <Paper classes={{ root: classes.chatLog }}>
            <List>
                {chatLog.map((log, index) => {
                    const { name, color, message } = log;
                    return (
                        <ListItem
                            key={index}
                            classes={{ root: classes.listItem }}
                        >
                            <ListItemText
                                primary={name}
                                primaryTypographyProps={{
                                    style: { color },
                                }}
                                secondary={message}
                            />
                        </ListItem>
                    );
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
