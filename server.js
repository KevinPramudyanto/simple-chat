const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static("public"));

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Broadcast received messages
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // Broadcast to all connected clients
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
