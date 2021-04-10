import React from "react";
import { useRouter } from "next/router";
import SignIn from "../src/components/SignIn";

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
