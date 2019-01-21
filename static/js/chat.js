$(() => {
    const socket = io();
    $('form').submit((e) => {
        e.preventDefault(); // prevents page reloading
        let regu = "^[ ]+$"; // regular expression
        let re = new RegExp(regu);
        // Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
        // 防止啥都沒打跟只打了一堆空白就送出
        if (re.test($('#m').val()) == true || $('#m').val() == '') {
            $('#m').val('');
            return false;
        }
        else {
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        }
    });
    socket.on('chat message', (msg) => {
        $('#messages').append(`
        <li>
            <img id="userPhoto" src="../static/image/eggroll.PNG"/>
            <span>一枚蛋捲</span>
            <div>
                <p>${msg}</p>
            </div>
        </li>`);
        //$('#messages').append($('<li>').text(msg));
        $('#messages').scrollTop($('#messages')[0].scrollHeight); // 讓 scrollbar 一直滾到最下方。
    });
});