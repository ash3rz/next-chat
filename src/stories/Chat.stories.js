import React, { useState } from "react";
import Chat from "../components/Chat";

export function ChatStory() {
    const batmanColor = "#353745";
    const supermanColor = "#9F4347";
    const myColor = "#5D9377";

    const users = [
        { username: "Batman" },
        {
            username: "Superman",
        },
    ];

    const [chatLog, setChatLog] = useState([
        { username: "Batman", message: "Hello!", color: batmanColor },
        {
            username: "Superman",
            message: "I can beat you up! LOL",
            color: supermanColor,
        },
        { username: "Batman", message: ":(", color: batmanColor },
    ]);
    const onSend = (msg) =>
        setChatLog([
            ...chatLog,
            { username: "Me", message: msg, color: myColor },
        ]);

    return <Chat chatLog={chatLog} users={users} onSend={onSend} />;
}

export default {
    title: "Chat",
    component: ChatStory,
};
