const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-23prj.mongodb.net/main?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

//GET, POST, PUT and DELETE
//req.query = access query params (for filters)
//req.params = access route params (for editing, delete)
//req.body = access request body

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);

