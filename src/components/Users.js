import {
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
} from "@material-ui/core";
import React from "react";
import UserAvatar from "./UserAvatar";

const drawerWidth = "250px";

const useStyles = makeStyles(() => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },

    drawerPaper: {
        width: drawerWidth,
    },
}));

function Users(props) {
    const { users } = props;
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <List>
                {users?.map(({ username }) => (
                    <ListItem key={username}>
                        <ListItemAvatar>
                            <Avatar>
                                <UserAvatar name={username} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={username} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Users;
