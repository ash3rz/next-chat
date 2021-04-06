import React, { useState } from "react";
import Chat from "../components/index";

export function ChatStory() {
    const [chatLog, setChatLog] = useState([
        "Hello",
        "Here's my message",
        "More message!",
    ]);
    const onSend = (msg) => setChatLog([...chatLog, msg]);

    return <Chat chatLog={chatLog} onSend={onSend} />;
}

export default {
    title: "Chat",
    component: ChatStory,
};
