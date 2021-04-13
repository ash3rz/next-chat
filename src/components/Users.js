import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
} from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import UserAvatar from "./UserAvatar";

const drawerWidth = "250px";

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

function Users(props) {
    const { users, expanded, handleUsersMini } = props;
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: expanded,
                [classes.drawerClose]: !expanded,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: expanded,
                    [classes.drawerClose]: !expanded,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleUsersMini}>
                    <ChevronLeft />
                </IconButton>
            </div>
            <Divider />
            <List>
                {users?.map(({ name, isTyping }, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <UserAvatar name={name} isTyping={isTyping} />
                        </ListItemAvatar>
                        <ListItemText primary={name} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Users;

Users.propTypes = {
    users: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired,
    handleUsersMini: PropTypes.func.isRequired,
};
