import React, { useEffect, useState } from "react";
import Chat from "../src/components/index";

import io from 'socket.io-client';
const socket = io("http://localhost:3000");

function Home() {
    const [chatLog, setChatLog] = useState([]);

    useEffect(() => {
        socket.on("chat message", (message) => {
            setChatLog([...chatLog, message])
        })

        return () => {
            socket.off('chat message');
          };
    })

    const onSend = (message) => {
        socket.emit("chat message", message);
        console.log("sent message");
    };

    return <Chat chatLog={chatLog} onSend={onSend}/>;
}

export default Home;
