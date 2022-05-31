const http = require("http");
const app = require("./app");

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});

// Web sockets
const io = require("socket.io")(server);

io.sockets.on("connection", (socket) => {
    console.log("Client connected: " + socket.id);

    // arrays of datas
    // send the arrays of datas to the client

    socket.on("mouse", (data) => socket.broadcast.emit("mouse", data)); // + push data to the arrays of datas (in the correct indexed array)

    socket.on("disconnect", () => console.log("Client has disconnected"));
});

server.listen(port);