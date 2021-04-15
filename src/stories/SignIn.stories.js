import React from "react";
import SignIn from "../components/SignIn";

export function SignInStory() {
    const onSignIn = (name) => console.log("Sign in as user", name);
    return <SignIn onSignIn={onSignIn} />;
}

export default {
    title: "Sign In",
    component: SignInStory,
};
