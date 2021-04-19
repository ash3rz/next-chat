import { ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "./UserAvatar";

const useStyles = makeStyles((theme) => ({
    listItem: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: 0,
    },
}));

function ChatMessage(props) {
    const { name, color, message } = props;
    const classes = useStyles();

    return (
        <ListItem classes={{ root: classes.listItem }}>
            <ListItemIcon>
                <UserAvatar name={name} />
            </ListItemIcon>
            <ListItemText
                primary={name}
                primaryTypographyProps={{
                    style: { color },
                }}
                secondary={message}
            />
        </ListItem>
    );
}

export default ChatMessage;

ChatMessage.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    message: PropTypes.string.isRequired,
}
