import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Users from "../components/Users";

export function UsersStory() {
    const [expanded, setExpanded] = useState(true);
    const [value, setValue] = useState("");
    const [users, setUsers] = useState([
        { name: "Zod" },
        { name: "Batman" },
        { name: "Superman" },
        { name: "Wonder Woman" },
        { name: "Bibbity boppity" },
        { name: "Cyborg" },
    ]);

    const handleChange = (event) => setValue(event.target.value);
    const addUser = () => setUsers([...users, { name: value }]);

    return (
        <div style={{ display: "flex" }}>
            <Users
                users={users}
                expanded={expanded}
                handleUsersMini={() => setExpanded(!expanded)}
            />
            <div style={{ display: "flex", flexGrow: 1 }}>
                <TextField
                    variant="outlined"
                    value={value}
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" onClick={addUser}>
                    Add Name
                </Button>
            </div>
        </div>
    );
}

export default {
    title: "Chat",
    component: UsersStory,
};
