import { makeStyles } from "@material-ui/core";
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

    const setNum = "set1";
    const size = "50";

    const imgUrl = `https://www.robohash.org/${name}?set=${setNum}&size=${size}x${size}`;

    return <img className={classes.flipped} src={imgUrl} alt="avatar" />;
}

export default UserImg;

UserImg.propTypes = {
    name: PropTypes.string.isRequired, // nickname for user
};
