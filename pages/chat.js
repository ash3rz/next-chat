import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import apiCall from "../src/apiCall";
import Chat from "../src/components/Chat";

function ChatPage(props) {
    const { socket } = props;
    const [chatLog, setChatLog] = useState([]);
    const [users, setUsers] = useState([]);

    useQuery({
        queryKey: "users",
        queryFn: () => apiCall("/api/users"),
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

    return <Chat chatLog={chatLog} users={users} onSend={onSend} />;
}

ChatPage.propTypes = {
    socket: PropTypes.object.isRequired, //socket.io client
};

export default ChatPage;
