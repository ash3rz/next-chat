import React, { useState } from "react";
import Chat from "../components/chat";

export function ChatStory() {
    const [chatLog, setChatLog] = useState([
        { username: "Batman", message: "Hello!" },
        { username: "Superman", message: "I can beat you up! LOL" },
        { username: "Batman", message: ":(" },
    ]);
    const onSend = (msg) =>
        setChatLog([...chatLog, { username: "Me", message: msg }]);

    return <Chat chatLog={chatLog} onSend={onSend} />;
}

export default {
    title: "Chat",
    component: ChatStory,
};
