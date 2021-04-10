import React from "react";
import Users from "../components/Users";

export function UsersStory() {
    const users = [{ username: "Batman" }, { username: "Superman" }, {username: "Bibbity boppity"}];

    return <Users users={users} />;
}

export default {
    title: "Users",
    component: UsersStory,
};
