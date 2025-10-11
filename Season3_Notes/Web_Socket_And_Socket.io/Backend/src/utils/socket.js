// Import the Socket.IO library
// This allows real-time, bi-directional communication between server and client
const socket = require("socket.io");

// Define a function that initializes and sets up Socket.IO
// It takes your existing HTTP server as a parameter
const initializeSocket = (server) => {

    // Create a new Socket.IO instance attached to your HTTP server
    // The 'cors' option specifies which frontend origin is allowed to connect
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173", // allow requests from your Vite frontend
        },
    });

    // Listen for new client connections
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        // Custom event listener: when a client joins a chat
        // e.g., user opens a chat room
        socket.on("joinChat", () => {
            console.log("User joined a chat");
        });

        // Custom event listener: when a client sends a message
        // You’ll typically broadcast this message to other users
        socket.on("sendMessage", (messageData) => {
            console.log("Message received:", messageData);
            // Send the message to all connected clients (including the sender)
            io.emit("receiveMessage", messageData);
        });

        // Built-in event: triggers when a user disconnects (closes tab or loses connection)
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

// Export the function so it can be imported and used in your main server file
module.exports = initializeSocket;
    