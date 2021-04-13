import React, { useState } from "react";
import ChatRoom from "../components/ChatRoom";

export function ChatRoomStory() {
    const batmanColor = "#353745";
    const supermanColor = "#9F4347";
    const myColor = "#5D9377";

    const [chatLog, setChatLog] = useState([
        { name: "Batman", message: "Hello!", color: batmanColor },
        {
            name: "Superman",
            message: "I can beat you up! LOL",
            color: supermanColor,
        },
        { name: "Batman", message: ":(", color: batmanColor },
    ]);

    const [users, setUsers] = useState([
        { name: "Batman" }, { name: "Superman" }, { name: "Me" }
    ])

    const onSend = (msg) =>
        setChatLog([...chatLog, { name: "Me", message: msg, color: myColor }]);

    const onUpdateTyping = (isTyping) => {
        const updatedUsers = users.map((user) => user.name === "Me" ? {...user, isTyping: isTyping} : user);
        setUsers(updatedUsers);
    };

    return (
        <ChatRoom
            chatLog={chatLog}
            users={users}
            onSend={onSend}
            onUpdateTyping={onUpdateTyping}
        />
    );
}

export default {
    title: "Chat",
    component: ChatRoomStory,
};
