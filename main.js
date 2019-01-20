const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const index = require('./routes/index'); //引入檔案
const PORT = process.env.PORT || 3000; //local use 3000

app.set('view engine', 'ejs');
app.use('/', index);

app.use('/static', express.static('static'))

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

http.listen(PORT, function () {
    console.log('listening on http://localhost:3000');
});