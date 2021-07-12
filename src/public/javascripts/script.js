$(document).ready(function(){
    $("button").click(e => {
        $.ajax({
            method: 'get',
            url: '/universities',
        });
    })
  });
