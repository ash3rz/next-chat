import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import apiCall from "./apiCall";

const MAX_CHAT_LOG_MSGS = 100;

function useSocketIo(socket) {
    const queryClient = useQueryClient();

    // For chat view
    const [chatLog, setChatLog] = useState([]);
    const [users, setUsers] = useState([]);

    const usersQueryKey = "users";

    useQuery({
        queryKey: usersQueryKey,
        queryFn: () => apiCall("/api/users"),
        onSuccess: (resp) => setUsers(resp),
    });

    const addChatMessage = (message) => {
        setChatLog([...chatLog, message].slice(-MAX_CHAT_LOG_MSGS));
    };

    useEffect(() => {
        socket.on("login", (data) => {
            const message = `Welcome to Next chat. ${data.numUsers} active`;
            addChatMessage({ message });

            queryClient.invalidateQueries(usersQueryKey);
        });

        socket.on("chat message", (data) => {
            addChatMessage(data);
        });

        socket.on("user joined", (data) => {
            const message = `${data.name} joined the chat (${data.numUsers} total)`;
            addChatMessage({ ...data, message });
            setUsers([...users, { name: data.name }]);
        });

        socket.on("user left", (data) => {
            const message = `${data.name} left the chat (${data.numUsers} total)`;
            addChatMessage({ ...data, message });

            const remainingUsers = users.filter(
                (user) => user.name !== data.name
            );
            setUsers(remainingUsers);
        });

        socket.on("user typing", (data) => {
            const { name } = data;

            const updatedUsers = users.map((user) => {
                return user.name === name ? { ...user, isTyping: true } : user;
            });

            setUsers(updatedUsers);
        });

        socket.on("stop typing", (data) => {
            const { name } = data;

            const updatedUsers = users.map((user) => {
                return user.name === name ? { ...user, isTyping: false } : user;
            });

            setUsers(updatedUsers);
        });

        return () => {
            socket.off("login");
            socket.off("chat message");
            socket.off("user joined");
            socket.off("user left");
            socket.off("user typing");
            socket.off("stop typing");
        };
    });

    const onSend = (message) => {
        socket.emit("chat message", message);
    };

    const onSignIn = (name, color) => {
        socket.connect();
        socket.emit("add user", { name, color });
    };

    const onUpdateTyping = (typing) => {
        typing ? socket.emit("user typing") : socket.emit("stop typing");
    };

    const onSignOut = () => {
        socket.disconnect();
    };

    return {
        chatLog,
        users,
        onSend,
        onUpdateTyping,
        onSignIn,
        onSignOut,
    };
}

export default useSocketIo;
