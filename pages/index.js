import React, { useEffect, useState } from "react";
import SignIn from "../src/components/SignIn";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import apiCall from "../src/apiCall";
import ChatRoom from "../src/components/ChatRoom";
import { Grow } from "@material-ui/core";

function Home(props) {
    const { socket } = props;

    // For sign in view
    const [signedIn, setSignedIn] = useState(false);

    // For chat view
    const [chatLog, setChatLog] = useState([]);
    const [users, setUsers] = useState([]);

    useQuery({
        queryKey: "users",
        queryFn: () => apiCall("/api/users"),
        enabled: !!signedIn,
        onSuccess: (resp) => setUsers(resp),
    });

    useEffect(() => {
        socket.on("login", (data) => {
            const message = `Welcome to Next chat. ${data.numUsers} active`;
            setChatLog([...chatLog, { message }]);
        });

        socket.on("chat message", (data) => {
            setChatLog([...chatLog, data]);
        });

        socket.on("user joined", (data) => {
            const message = `${data.name} joined the chat (${data.numUsers} total)`;
            setChatLog([...chatLog, { ...data, message }]);
            setUsers([...users, { name: data.name }]);
        });

        socket.on("user left", (data) => {
            const message = `${data.name} left the chat (${data.numUsers} total)`;
            setChatLog([...chatLog, { ...data, message }]);

            const remainingUsers = users.filter(
                (user) => user.name !== data.name
            );
            setUsers(remainingUsers);
        });

        return () => {
            socket.off("login");
            socket.off("chat message");
            socket.off("user joined");
            socket.off("user left");
        };
    });

    const onSend = (message) => {
        socket.emit("chat message", message);
        console.log("sent message");
    };

    const onSignIn = (name, color) => {
        socket.emit("add user", { name, color });
        setSignedIn(true);
    };

    if (!signedIn) {
        return <SignIn onSignIn={onSignIn} />;
    }

    return (
        <Grow in={!!signedIn}>
            <ChatRoom chatLog={chatLog} users={users} onSend={onSend} />
        </Grow>
    );
}

export default Home;

Home.propTypes = {
    socket: PropTypes.object.isRequired, // socket.io client
};
