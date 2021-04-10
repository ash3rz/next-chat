import { MD5 } from "crypto-js";
import React from "react";

function UserAvatar(props) {
    const { name } = props;

    const hash = MD5(name);
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=45&d=robohash`;
    
    return <img src={gravatarUrl} alt="avatar" />;
}

export default UserAvatar;