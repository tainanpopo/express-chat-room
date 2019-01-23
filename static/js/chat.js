$(() => {
    const socket = io();
    let emoteArray = [];
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
            socket.emit('sendImg', {
                id: emoteArray,
                message: $('#m').val()
            });
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            emoteArray = [];
            return false;
        }
    });
    // socket.on('chat message', (msg) => {
    //     $('#messages').append(`
    //     <li>
    //         <img id="userPhoto" src="../static/image/eggroll.PNG"/>
    //         <span>一枚蛋捲</span>
    //         <div>
    //             <p>${msg}</p>
    //         </div>
    //     </li>`);
    //     //$('#messages').append($('<li>').text(msg));
    //     $('#messages').scrollTop($('#messages')[0].scrollHeight); // 讓 scrollbar 一直滾到最下方。
    // });

    // Click to login.
    $('#nameBtn').click(inputName);

    // Press enter key to login.
    $('#name').keyup((event) => {
        if (event.which == 13) {
            inputName();
        }
    });

    function inputName () {
        $('.name').hide();
        socket.emit('login', $('#name').val());
        return false;
    }

    // Click Emotes.
    $('.emoticons img').click(showImage);

    function showImage () {
        let id = $(this).attr('id');
        emoteArray.push(id);
        console.log(id);
        let old = $('#m').val();
        $('#m').val(old + id);
        return false;
    }

    // 接收貼圖
    socket.on('receiveImg', (obj) => {
        let image = obj.image;
        let side = obj.side;
        let emoteSide = obj.emoteSide;
        let name = obj.name;
        let msg = obj.msg;
        console.log('input val: ' + msg);
        let content = '';
        let contentEmote = '';
        console.log(image.length);
        for (i = 0; i < image.length; i++) {
            content += `<img src="../static/image/${image[i]}.png" />`
            contentEmote += `<img id="emote" src="../static/image/${image[i]}.png" />`
        }

        if (emoteSide == 'imgleft') {
            $('#messages').append(`
            <li class="${emoteSide}">
                <img id="userPhoto" src="../static/image/male.png"/>
                <span>${name}</span>
                <div>
                    ${contentEmote}
                </div>
            </li>`);
        }
        else {
            $('#messages').append(`
            <li class="${emoteSide}">
                <div>
                    ${content}
                </div>
            </li>`);
        }
        //<img id="emote" src="../static/image/${image}.png"/>
        //<img src="../static/image/${image}.png"/>
        //$('#messages').append($('<li>').text(msg));
        $('#messages').scrollTop($('#messages')[0].scrollHeight); // 讓 scrollbar 一直滾到最下方。
    });

    // 接收訊息
    socket.on('receiveMsg', (obj) => {
        let name = obj.name;
        let msg = obj.msg;
        let side = obj.side;

        if (side == 'left') {
            $('#messages').append(`
            <li class="${side}">
                <img id="userPhoto" src="../static/image/male.png"/>
                <span>${name}</span>
                <div>
                    <p>${msg}</p>
                </div>
            </li>`);
        }
        else {
            $('#messages').append(`
            <li class="${side}">
                <p>${msg}</p>
            </li>`);
        }
        //$('#messages').append($('<li>').text(msg));
        $('#messages').scrollTop($('#messages')[0].scrollHeight); // 讓 scrollbar 一直滾到最下方。
    });
});