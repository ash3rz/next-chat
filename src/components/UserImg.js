import { makeStyles } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(() => ({
    flipped: {
        transform: "scaleX(-1)",
        "-webkit-transform": "scaleX(-1)",
    },
}));

function UserImg(props) {
    const { name } = props;
    const classes = useStyles();

    if (!name) {
        return <Person color="primary" />
    }

    const setNum = "set1";
    const size = "50";

    const imgUrl = `https://www.robohash.org/${name}?set=${setNum}&size=${size}x${size}`;

    return <img className={classes.flipped} src={imgUrl} alt="avatar" />;
}

export default UserImg;

UserImg.propTypes = {
    name: PropTypes.string, // nickname for user
};
