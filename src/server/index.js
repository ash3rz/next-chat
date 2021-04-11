const express = require("express");
const app = express();
const next = require("next");
const server = require("http").Server(app);
const io = require("socket.io")(server);

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

let numUsers = 0;
let users = [];

io.on("connection", (socket) => {
    let addedUser = false;

    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log(`user ${socket.username} disconnected`);
        if (addedUser) {
            --numUsers;
            users = users.filter((user) => user.username !== socket.username);

            // echo globally that this client has left
            socket.broadcast.emit("user left", {
                username: socket.username,
                numUsers: numUsers,
            });
        }
    });

    socket.on("add user", (data) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = data.name;
        socket.color = data.color;
        ++numUsers;
        users.push({ username: data.name });
        addedUser = true;
        socket.emit("login", {
            numUsers: numUsers,
        });

        // echo globally (all clients) that a person has connected
        socket.broadcast.emit("user joined", {
            username: socket.username,
            color: socket.color,
            numUsers: numUsers,
        });
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", {
            username: socket.username,
            color: socket.color,
            message: msg,
        });
    });

    socket.on("user typing", (data) => {
        socket.broadcast.emit("user typing", {
            username: socket.username,
            time: data.time,
        });
    });

    socket.on("stop typing", () => {
        socket.broadcast.emit("stop typing", {
            username: socket.username,
        });
    });
});

nextApp.prepare().then(() => {
    app.get("/api/users", (req, res) => {
        res.send(users);
    });

    app.get("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log("> Ready on http://localhost:3000");
    });
});
