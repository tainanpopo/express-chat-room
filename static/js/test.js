$(() => {
    const socket = io();
    let emoteArray = [];
    let click = false;
    $('form').submit((e) => {
        e.preventDefault(); // prevents page reloading
        let regu = "^[ ]+$"; // regular expression
        let re = new RegExp(regu);
        // Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
        // 防止啥都沒打跟只打了一堆空白就送出
        if (re.test($('#m').val()) == true || $('#m').val() == '') {
            return false;
        }
        else {
            // socket.emit('chat message', {
            //     emoteId: emoteArray,
            //     message: $('#m').val()
            // });
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            emoteArray = []
            return false;
        }
    });

    // 接收訊息
    socket.on('receiveMsg', (obj) => {
        let name = obj.name;
        let msg = obj.msg;
        let side = obj.side;
        let emoteId = obj.emoteId;
        let content = '';
        console.log('msg: ' + msg);
        console.log('emoteId: ' + emoteId);
        // content += `<span>${msg}</span>`;
        // for (let i = 0; i < emoteId.length; i++) {
        //     content += `<img src="../static/image/${emoteId[i]}.png"/>`;
        // }

        if (side == 'left') {
            if (emoteId != undefined) {
                $('#conversation').append(`
                <div class=${side}><img id="userPhoto" src="../static/image/male.png"/><span>${name}</span></div>
                <div class=${side}><img src="../static/image/${emoteId}.png"/></div>
            `);
            }
            else {
                $('#conversation').append(`
                <div class=${side}><img id="userPhoto" src="../static/image/male.png"/><span>${name}</span></div>
                <div class=${side}><span>${msg}</span></div>
            `);
            }
        }
        else {
            if (emoteId != undefined) {
                $('#conversation').append(`
                
                <div class=${side}><img src="../static/image/${emoteId}.png"/></div>
            `);
            }
            else {
                $('#conversation').append(`
                <div class=${side}><span>${msg}</span></div>`);
            }
        }
        //<div class=${side}>${content}</div>
        $('#conversation').scrollTop($('#conversation')[0].scrollHeight); // 讓 scrollbar 一直滾到最下方。
    });

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
    $('#emoticons img').click(inputEmotes);

    function inputEmotes () {
        let id = $(this).attr('id');
        emoteArray.push(id);
        // console.log(id);
        // let old = $('#m').val();
        // $('#m').val(old + id);
        socket.emit('chat message', {
            emoteId: id,
        });
        return false;
    }

    // Click gugu2525 Emotes.
    $('#gugu2525 img').click(gugu2525InputEmotes);

    function gugu2525InputEmotes () {
        let id = $(this).attr('id');
        emoteArray.push(id);
        // console.log(id);
        // let old = $('#m').val();
        // $('#m').val(old + id);
        socket.emit('chat message', {
            emoteId: id,
        });
        return false;
    }

    // Click gugu2525Emotes button, show the gugu2525 block.
    $('#main #emoticons button').click(gugu2525EmotesClick);

    function gugu2525EmotesClick () {
        if (!click) {
            $('#gugu2525').css('display', 'block');
            $('#gugu2525').css('top', $('#main #emoticons button').position().top);
            click = true;
        }
        else {
            $('#gugu2525').css('display', 'none');
            click = false;
        }
        //console.log($('#main #emoticons button').position().top);
        //({top: 200, left: 200, position:'absolute'});
    };

    $('#form form #m').click(mClick);

    function mClick () {
        $('#gugu2525').css('display', 'none');
    };
});