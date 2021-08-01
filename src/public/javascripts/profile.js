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
                success: data => updateUserData(data)
            });
        }
    });
    $('#username').append(btn);
}

function updateUserData(data) {
    data.username = $('#inp_edit').val();
    $.ajax({
        method: "POST",
        url: "/user-info",
        data: data,
        success: res => {window.location.href = "/";}
    });
}