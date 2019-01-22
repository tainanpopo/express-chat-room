const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const index = require('./routes/index'); //引入檔案
const PORT = process.env.PORT || 3000; //local use 3000, deploy use 5000

app.set('view engine', 'ejs');
app.use('/', index);

app.use('/static', express.static('static'))

var user = [];

io.on('connection', function (socket) {
    socket.on('login', function (name) {
        user.push(name);
        socket.nickname = name;
    });

    socket.on('chat message', function (msg) {
        socket.broadcast.emit('receiveMsg', {
            name: socket.nickname,
            msg: msg,
            side: 'left'
        });

        socket.emit('receiveMsg', {
            name: socket.nickname,
            msg: msg,
            side: 'right'
        });
    });

    socket.on('sendImg', (msg) => {
        socket.broadcast.emit('receiveImg', {
            name: socket.nickname,
            image: msg,
            side: 'imgleft'
        });

        socket.emit('receiveImg', {
            name: socket.nickname,
            image: msg,
            side: 'imgright'
        });
    });
});

http.listen(PORT, function () {
    console.log('listening on http://localhost:3000');
});