function togglePW() {
    if ($('#pw_btn').text() === 'SHOW') {
        $.ajax({
            method: "GET",
            url: "/pw",
            success: pw => {
                $('#password').empty();
                $('#password').html('PASSWORD: ' + pw + ' ');
                var btn = $('<button/>',
                {
                    id: 'pw_btn',
                    text: 'HIDE',
                    click: () => { togglePW(); }
                });
                $('#password').append(btn);
            }
        });
    } else {
        $('#password').empty();
        $('#password').html('PASSWORD: ');
        var btn = $('<button/>',
        {
            id: 'pw_btn',
            text: 'SHOW',
            click: () => { togglePW(); }
        });
        $('#password').append(btn);
    }
}