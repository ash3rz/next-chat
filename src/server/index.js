const express = require("express");
const app = express();
const next = require("next");
const server = require("http").Server(app);
const io = require("socket.io")(server);

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

let numUsers = 0;

io.on("connection", (socket) => {
    let addedUser = false;

    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("add user", (data) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = data.name;
        socket.color = data.color;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
          numUsers: numUsers
        });
        
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
          username: socket.username,
          color: socket.color,
          numUsers: numUsers,
        });
    })

    socket.on("chat message", (msg) => {
        io.emit("chat message", {
            username: socket.username,
            color: socket.color,
            message: msg,
        });
    });
});

nextApp.prepare().then(() => {
    app.get("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log("> Ready on http://localhost:3000");
    });
});
