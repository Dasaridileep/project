const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
mongoose.connect('mongodb+srv://Dileep:dileep123@cluster0.gdwvcpv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log('Connected to MongoDB'))
.catch(err=> console.log('Error connectiong to mongoDB:',err));


const chatSchema = new mongoose.Schema({
    text: String,
});

const chat = mongoose.model('chat', chatSchema);


app.use(express.static(path.join(__dirname, "C:\Users\lenovo\Downloads\project\public\index.html")));

io.on("connection", function(socket) {
    socket.on("newuser", function(username) {
        io.emit("update", username + " joined the conversation");
    });

    socket.on("exituser", function(username) {
        io.emit("update", username + " left the conversation");
    });

    socket.on("chat", function(message) {
        io.emit("chat", message);
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
