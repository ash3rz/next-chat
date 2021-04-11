import { Badge, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}))(Badge);

function TypingBadge(props) {
    const { children } = props;
    return (
        <StyledBadge
            overlap="circle"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            variant="dot"
        >
            {children}
        </StyledBadge>
    );
}

export default TypingBadge;

TypingBadge.propTypes = {
    children: PropTypes.any.isRequired,
}