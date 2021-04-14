import {
    AppBar,
    Button,
    IconButton,
    makeStyles,
    Toolbar as MuiToolbar,
    Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const drawerWidth = "250";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
}));

function Toolbar(props) {
    const { handleUsersExpanded, usersExpanded, onSignOut } = props;
    const classes = useStyles();
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: usersExpanded,
            })}
        >
            <MuiToolbar>
                <IconButton
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: usersExpanded,
                    })}
                    color="inherit"
                    aria-label="menu"
                    onClick={handleUsersExpanded}
                >
                    <Menu />
                </IconButton>
                <Typography className={classes.title}>
                    Welcome to Next Chat!
                </Typography>
                <Button color="inherit" onClick={onSignOut}>
                    Sign Out
                </Button>
            </MuiToolbar>
        </AppBar>
    );
}

export default Toolbar;

Toolbar.propTypes = {
    onSignOut: PropTypes.func.isRequired,
    handleUsersExpanded: PropTypes.func.isRequired,
    usersExpanded: PropTypes.bool.isRequired,
};
