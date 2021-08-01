function editUser() {

    var inp = $('<input/>', {
        id: 'inp_edit',
        placeholder: 'New Username'
    });
    $('#username').append(inp);

    var btn = $('<button/>', {
        id: 'btn_edit',
        text: 'Confirm',
        click: () => {
            $.ajax({
                method: "GET",
                url: "/user-info",
                success: data => {
                    data.username = $('#inp_edit').val();
                    updateUserData(data);
                }
            });
        }
    });
    $('#username').append(btn);
}

function editCountry() {

    var inp = $('<input/>', {
        id: 'inp_edit_country',
        placeholder: 'New Country'
    });
    $('#country').append(inp);

    var btn = $('<button/>', {
        id: 'btn_edit_country',
        text: 'Confirm',
        click: () => {
            $.ajax({
                method: "GET",
                url: "/user-info",
                success: data => {
                    data.country = $('#inp_edit_country').val();
                    updateUserData(data);
                }
            });
        }
    });
    $('#country').append(btn);
}

function updateUserData(data) {
    $.ajax({
        method: "POST",
        url: "/user-info",
        data: data,
        success: res => {window.location.href = "/";}
    });
}