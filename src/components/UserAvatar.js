import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import TypingBadge from "./TypingBadge";
import UserImg from "./UserImg";

function UserAvatar(props) {
    const { name, isTyping } = props;

    if (isTyping) {
        return (
            <TypingBadge>
                <Avatar>
                    <UserImg name={name} />
                </Avatar>
            </TypingBadge>
        );
    }

    return (
        <Avatar>
            <UserImg name={name} />
        </Avatar>
    );
}

export default UserAvatar;

UserAvatar.propTypes = {
    name: PropTypes.string.isRequired, // nickname for user
    isTyping: PropTypes.bool,
};
