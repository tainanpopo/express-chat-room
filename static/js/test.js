$(() => {
    const socket = io();
    let twitchDefault =  ['SMOrc', 'FailFish', 'GivePLZ', 'TakeNRG', 'MingLee', 'Kappa', 'KappaPride', 
            'PogChamp', 'BibleThump', 'BloodTrail', 'HeyGuys', 'LUL', 'ResidentSleeper', 'gugu1Cc', 'gugu1Face', 
            'gugu11', 'gugu12god', 'gugu18', 'gugu1Angel55', 'gugu1Baka', 'gugu1Annoyed','gugu1Bb', 'gugu1ChuL', 
            'gugu1ChuR', 'gugu1S2', 'gugu1S', 'gugu1TT', 'gugu1Dance', 'jinnytOMEGALUL', 'jinnytHype', 'jinnytREE']

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
            socket.emit('chat message', {
                message: $('#m').val()
            })
            $('#m').val('');
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
        console.log('message: ' + message);
        console.log('emoteId: ' + emoteId);
        while(blank !== -1){
            let checkMessage = false;
            blank = message.indexOf(' ');
            let res = message.substr(0, blank);
            message = message.substr(blank + 1, message.length);
            if(res !== ''){
                for(let i = 0;i < twitchDefault.length;i++){
                    if(twitchDefault[i] === res){
                        checkMessage = true;
                    }
                }
                if(checkMessage === true){
                    content += `<img src="../static/image/${res}.png"/>`;
                    checkMessage = false;
                }
                else{
                    content += res;
                    checkMessage = false;
                }
            }
        }

        let checkMessage = false;
        if(message !== ''){
            for(let i = 0;i < twitchDefault.length;i++){
                if(twitchDefault[i] === message){
                    checkMessage = true;
                }
            }
            if(checkMessage === true){
                content += `<img src="../static/image/${message}.png"/>`;
                checkMessage = false
            }
            else{
                content += message;
                checkMessage = false
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
                <div class=${side}><span>${content}</span></div>
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
        console.log(id);
        let old = $('#m').val();
        $('#m').val(old + id + ' ');
        return false;
    }

    // Click gugu2525 Emotes.
    $('.gugu2525 img').click(gugu2525InputEmotes);

    function gugu2525InputEmotes () {
        let id = $(this).attr('id');
        console.log(id);
        let old = $('#m').val();
        $('#m').val(old + id + ' ');
        return false;
    }

    // Click jinny Emotes.
    $('.jinny img').click(jinnyInputEmotes);

    function jinnyInputEmotes () {
        let id = $(this).attr('id');
        console.log(id);
        let old = $('#m').val();
        $('#m').val(old + id + ' ');
        return false;
    }

    // Click gugu2525Emotes button, show the gugu2525 block.
    $('#main #emoticons #guguBtn').click(gugu2525EmotesClick);

    function gugu2525EmotesClick () {
        let id = $('.gugu2525').attr('class');
        console.log(id);
        if(id === 'gugu2525'){
            $('.gugu2525').css('display', 'block');
            $('.gugu2525').css('top', $('#main #emoticons #guguBtn').position().top);
            $('.gugu2525').toggleClass('show');
        }
        else{
            console.log('???');
            $('.gugu2525').css('display', 'none');
            $('.gugu2525').css('top', $('#main #emoticons #guguBtn').position().top);
            $('.gugu2525').toggleClass('show');
        }
        //console.log($('#main #emoticons button').position().top);
        //({top: 200, left: 200, position:'absolute'});
    };

    // Click jinnyEmotes button, show the jinny block.
    $('#main #emoticons #jinnyBtn').click(jinnyEmotesClick);

    function jinnyEmotesClick () {
        let id = $('.jinny').attr('class');
        console.log(id);
        if(id === 'jinny'){
            $('.jinny').css('display', 'block');
            $('.jinny').css('top', $('#main #emoticons #jinnyBtn').position().top);
            $('.jinny').toggleClass('jinnyshow');
        }
        else{
            console.log('???');
            $('.jinny').css('display', 'none');
            $('.jinny').css('top', $('#main #emoticons #jinnyBtn').position().top);
            $('.jinny').toggleClass('jinnyshow');
        }
        //console.log($('#main #emoticons button').position().top);
        //({top: 200, left: 200, position:'absolute'});
    };

    $('#form form #m').click(mClick);

    function mClick () {
        $('.gugu2525').toggleClass('show');
        $('.jinny').toggleClass('jinnyshow');
        $('.gugu2525').css('display', 'none');
        $('.jinny').css('display', 'none');
    };

    $(document).mouseup(function (e) {
        let containerJinny = $(".jinny");
        let containerGugu2525 = $('.gugu2525');
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