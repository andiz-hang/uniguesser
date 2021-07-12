
$(document).ready(function(){
    var gameTimer;

    $("#start-button").click(e => {
        $.ajax({
            method: 'get',
            url: '/universities',
            success: displayPhoto
        });

        var startTime = new Date();

        gameTimer = setInterval(() => {
            currentTime = new Date();
            // console.log(currentTime - startTime)
            // $("#timer").innerHTML = '2:40';
            timeDiff = Math.floor((currentTime - startTime) / 1000);
           $("#timer")[0].innerHTML = timeDiff;
        }, 1000)
    })

    $("#end-button").click(e => {
        clearInterval(gameTimer);

        $.ajax({
            method: 'post',
            url: '/game',
            data: {
                user_id: 1, 
                score: 25, 
                duration: 13, 
                created_at: new Date(Date.now()).toISOString().replace('T',' ').replace('Z','')
            }
        });
    })
  });

function displayPhoto(data) {
    $("#campus-photo").attr("src",data.photoUrl);
}
