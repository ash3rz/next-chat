import React, { useEffect, useState } from "react";
import Chat from "../src/components/Chat";

function Home(props) {
    const { socket } = props;
    const [chatLog, setChatLog] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on("chat message", (data) => {
            setChatLog([...chatLog, data]);
        });

        socket.on("user joined", (data) => {
            const message = `${data.username} joined the chat (${data.numUsers} total)`;
            setChatLog([...chatLog, { ...data, message }]);
            setUsers([...users, { username: data.username }]);
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

export default Home;
