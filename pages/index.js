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
    const [user, setUser] = useState(null);

    // For chat view
    const [chatLog, setChatLog] = useState([]);
    const [users, setUsers] = useState([]);

    const onSignIn = (name, color) => {
        socket.emit("add user", { name, color });
        setUser(name);
    };

    useQuery({
        queryKey: "users",
        queryFn: () => apiCall("/api/users"),
        enabled: !!user,
        onSuccess: (resp) => setUsers(resp),
    });

    useEffect(() => {
        socket.on("chat message", (data) => {
            setChatLog([...chatLog, data]);
        });

        socket.on("user joined", (data) => {
            const message = `${data.username} joined the chat (${data.numUsers} total)`;
            setChatLog([...chatLog, { ...data, message }]);
            setUsers([...users, { username: data.username }]);
        });

        socket.on("user left", (data) => {
            const message = `${data.username} left the chat (${data.numUsers} total)`;
            setChatLog([...chatLog, { ...data, message }]);

            const remainingUsers = users.filter(
                (user) => user.username !== data.username
            );
            setUsers(remainingUsers);
        });

        return () => {
            socket.off("chat message");
        };
    });

    const onSend = (message) => {
        socket.emit("chat message", message);
        console.log("sent message");
    };

    if (!user) {
        return <SignIn onSignIn={onSignIn} />;
    }

    return (
        <Grow in={!!user}>
            <ChatRoom chatLog={chatLog} users={users} onSend={onSend} />
        </Grow>
    );
}

export default Home;

Home.propTypes = {
    socket: PropTypes.object.isRequired, // socket.io client
};
