const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const index = require('./routes/index'); //引入檔案

app.set('view engine', 'ejs');
app.use('/', index);

app.use('/static', express.static('static'))

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

http.listen(3000, function () {
    console.log('listening on http://localhost:3000');
});