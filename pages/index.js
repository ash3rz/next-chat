import { Grow } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ChatRoom from "../src/components/ChatRoom";
import SignIn from "../src/components/SignIn";
import useSocketIo from "../src/useSocketIo";

function Home(props) {
    const { socket } = props;

    const {
        chatLog,
        users,
        onSend,
        onUpdateTyping,
        onSignIn,
        onSignOut,
    } = useSocketIo(socket);

    // For sign in view
    const [signedIn, setSignedIn] = useState(false);

    const handleSignIn = (name, color) => {
        onSignIn(name, color);
        setSignedIn(true);
    };

    const handleSignOut = () => {
        onSignOut();
        setSignedIn(false);
    };

    if (!signedIn) {
        return <SignIn onSignIn={handleSignIn} />;
    }

    return (
        <Grow in={!!signedIn}>
            <ChatRoom
                chatLog={chatLog}
                users={users}
                onSend={onSend}
                onUpdateTyping={onUpdateTyping}
                onSignOut={handleSignOut}
            />
        </Grow>
    );
}

export default Home;

Home.propTypes = {
    socket: PropTypes.object.isRequired, // socket.io client
};
