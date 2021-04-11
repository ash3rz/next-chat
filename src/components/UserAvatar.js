import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import TypingBadge from "./TypingBadge";
import UserImg from "./UserImg";

function UserAvatar(props) {
    const { username, isTyping } = props;

    if (isTyping) {
        return (
            <TypingBadge>
                <Avatar>
                    <UserImg name={username} />
                </Avatar>
            </TypingBadge>
        );
    }

    return (
        <Avatar>
            <UserImg name={username} />
        </Avatar>
    );
}

export default UserAvatar;

UserAvatar.propTypes = {
    username: PropTypes.string.isRequired, // nickname for user
    isTyping: PropTypes.bool,
};
