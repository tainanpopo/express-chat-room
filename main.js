const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const index = require('./routes/index'); //引入檔案
const PORT = process.env.PORT || 3000; //local use 3000, deploy use 5000

app.set('view engine', 'ejs');
app.use('/', index);

app.use('/static', express.static('static'))

let user = [];
let items = ['SMOrc', 'FailFish', 'GivePLZ', 'TakeNRG', 'MingLee', 'Kappa', 'KappaPride', 'PogChamp', 'BibleThump',
    'BloodTrail', 'HeyGuys', 'LUL', 'ResidentSleeper'];

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
        console.log(msg.message);
        socket.broadcast.emit('receiveImg', {
            name: socket.nickname,
            image: msg.id,
            emoteSide: 'imgleft',
            msg: msg.message,
            side: 'left'
        });

        socket.emit('receiveImg', {
            name: socket.nickname,
            image: msg.id,
            emoteSide: 'imgright',
            msg: msg.message,
            side: 'left'
        });
    });
});

http.listen(PORT, function () {
    console.log('listening on http://localhost:3000');
});