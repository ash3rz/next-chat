import { MD5 } from "crypto-js";
import PropTypes from "prop-types";
import React from "react";

function UserImg(props) {
    const { name } = props;

    const hash = MD5(name);
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=45&d=robohash`;

    return <img src={gravatarUrl} alt="avatar" />;
}

export default UserImg;

UserImg.propTypes = {
    name: PropTypes.string.isRequired, // nickname for user
};
