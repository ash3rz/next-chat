import {
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Paper,
    TextField,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Users from "./Users";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },

    chatBox: {
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },

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

    message: {
        display: "flex",
    },

    messageBox: {
        paddingTop: theme.spacing(2),
        marginTop: "auto",
    },

    root: {
        display: "flex",
    }
}));

function Chat(props) {
    const { chatLog, users, onSend } = props;
    const classes = useStyles();
    const [message, setMessage] = useState("");
    const bottomChat = useRef();

    const updateMessage = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = () => {
        if (message.length > 0) {
            onSend(message);
            setMessage("");
        }
    };

    useEffect(() => {
        bottomChat?.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatLog]);

    return (
        <div className={classes.root}>
            <Users users={users} />
            <div className={classes.chatBox}>
                <Paper classes={{ root: classes.chatLog }}>
                    <List>
                        {chatLog.map((log, index) => (
                            <ListItem
                                key={index}
                                classes={{ root: classes.listItem }}
                            >
                                <ListItemText
                                    primary={log.username}
                                    primaryTypographyProps={{
                                        style: { color: log.color },
                                    }}
                                    secondary={log.message}
                                />
                            </ListItem>
                        ))}
                        <div ref={bottomChat} />
                    </List>
                </Paper>
                <div className={classes.messageBox}>
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
            </div>
        </div>
    );
}

export default Chat;
