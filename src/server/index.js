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
        console.log(`user ${socket.name} disconnected`);
        if (addedUser) {
            --numUsers;
            users = users.filter((user) => user.name !== socket.name);

            // echo globally that this client has left
            socket.broadcast.emit("user left", {
                name: socket.name,
                numUsers: numUsers,
            });
        }
    });

    socket.on("add user", (data) => {
        if (addedUser) return;

        // we store the name in the socket session for this client
        socket.name = data.name;
        socket.color = data.color;
        ++numUsers;
        users.push({ name: data.name });
        addedUser = true;
        socket.emit("login", {
            numUsers: numUsers,
        });

        // echo globally (all clients) that a person has connected
        socket.broadcast.emit("user joined", {
            name: socket.name,
            color: socket.color,
            numUsers: numUsers,
        });
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", {
            name: socket.name,
            color: socket.color,
            message: msg,
        });
    });

    socket.on("user typing", () => {
        socket.broadcast.emit("user typing", {
            name: socket.name,
        });
    });

    socket.on("stop typing", () => {
        socket.broadcast.emit("stop typing", {
            name: socket.name,
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
