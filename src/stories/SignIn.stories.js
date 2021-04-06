import React from "react";
import SignIn from "../components";

export function SignInStory() {
    const onSignIn = (name) => console.log("Sign in as user", name);
    return <SignIn onSignIn={onSignIn} />;
}

export default {
    title: "Chat",
    component: SignInStory,
};
