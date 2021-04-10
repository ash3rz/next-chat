import React from "react";
import { useRouter } from "next/router";
import SignIn from "../src/components/SignIn";
import PropTypes from "prop-types";

function SignInPage(props) {
    const { socket } = props;
    const router = useRouter();

    const onSignIn = (name, color) => {
        socket.emit("add user", {name, color});
        router.push("/chat");
    };

    return <SignIn onSignIn={onSignIn}/>;
}

export default SignInPage;

SignInPage.propTypes = {
    socket: PropTypes.object.isRequired, // socket.io client
}
