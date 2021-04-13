import React from "react";
import Users from "../components/Users";

export function UsersStory() {
    const users = [
        { name: "Batman" },
        { name: "Superman" },
        { name: "Bibbity boppity" },
    ];

    return <Users users={users} />;
}

export default {
    title: "Users",
    component: UsersStory,
};
