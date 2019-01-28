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
            return false;
        }
        else {
            // socket.emit('chat message', {
            //     emoteId: emoteArray,
            //     message: $('#m').val()
            // });
            socket.emit('chat message', {
                message: $('#m').val()
            })
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
        let message = obj.message;
        let content = '';
        let blank;
        let word = '';
        console.log('message: ' + message);
        console.log('emoteId: ' + emoteId);
        // for (let i = 0; i < emoteId.length; i++) {
        //     content += `<img src="../static/image/${emoteId[i]}.png"/>`;
        // }
        while(blank !== -1){
            blank = message.indexOf(' ');
            let res = message.substr(0, blank);
            console.log('res: ' + res);
            message = message.substr(blank + 1, message.length);
            console.log('after substr: ' + message);
            if(res !== '' || message == 'LUL' || message == 'Kappa'){
                if(res == 'LUL' || res == 'Kappa'){
                    console.log('res in if: ' + res);
                    console.log(res.length);
                    content += `<img src="../static/image/${res}.png"/>`;
                }
                else{
                    content += res;
                }
            }
            console.log('message: ' + message);
            console.log(message.length);
            console.log('content: ' + content);
        }
        if(message !== ''){
            if( message == 'LUL' || message == 'Kappa'){
                console.log('content in if: ' + message);
                console.log(message.length);
                content += `<img src="../static/image/${message}.png"/>`;
            }
            else{
                content += message;
            }
        }
        console.log(content);

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
                <div class=${side}><span>${message}</span></div>
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
                <div class=${side}><span>${content}</span></div>`);
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
        console.log(id);
        let old = $('#m').val();
        $('#m').val(old + id + ' ');
        // socket.emit('chat message', {
        //     emoteId: id,
        // });
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

    // Click jinny Emotes.
    $('#jinny img').click(jinnyInputEmotes);

    function jinnyInputEmotes () {
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

    // $('#main #emoticons #guguBtn').mouseenter(() => {
    //     $('#gugu2525').css('display', 'block');
    //     $('#gugu2525').css('top', $('#main #emoticons #guguBtn').position().top);
    //     $('#gugu2525').css('width', 300);
    // });
    // $('#gugu2525').mouseenter(() => {
    //     $('#gugu2525').css('display', 'block');
    //     $('#gugu2525').css('top', $('#main #emoticons #guguBtn').position().top);
    //     $('#gugu2525').css('width', 300);
    // });

    // $('#main #emoticons #guguBtn').mouseleave(() => {
    //     $('#gugu2525').css('display', 'block');
    // });
    // $('#gugu2525').mouseleave(() => {
    //     $('#gugu2525').css('display', 'none');
    // });

    // Click gugu2525Emotes button, show the gugu2525 block.
    $('#main #emoticons #guguBtn').click(gugu2525EmotesClick);

    function gugu2525EmotesClick () {
        $('#gugu2525').css('display', 'block');
        $('#gugu2525').css('top', $('#main #emoticons #guguBtn').position().top);
        //console.log($('#main #emoticons button').position().top);
        //({top: 200, left: 200, position:'absolute'});
    };

    // Click jinnyEmotes button, show the gugu2525 block.
    $('#main #emoticons #jinnyBtn').click(jinnyEmotesClick);

    function jinnyEmotesClick () {
        $('#jinny').css('display', 'block');
        $('#jinny').css('top', $('#main #emoticons #jinnyBtn').position().top);
        //console.log($('#main #emoticons button').position().top);
        //({top: 200, left: 200, position:'absolute'});
    };

    $('#form form #m').click(mClick);

    function mClick () {
        $('#gugu2525').css('display', 'none');
        $('#jinny').css('display', 'none');
    };

    $(document).mouseup(function (e) {
        let containerJinny = $("#jinny");
        let containerGugu2525 = $('#gugu2525');
        //當點擊的不是該區塊而且不是點擊到他的內部(底下)的任何元素，就hide
        // if the target of the click isn't the container nor a descendant of the container
        if (!containerJinny.is(e.target) && containerJinny.has(e.target).length === 0) {
            containerJinny.hide();
        }
        if (!containerGugu2525.is(e.target) && containerGugu2525.has(e.target).length === 0) {
            containerGugu2525.hide();
        }
    });
});