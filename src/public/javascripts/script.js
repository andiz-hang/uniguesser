
var schoolList = [];
var schoolIndex = 0;
var gameTimer;

$(document).ready(function(){

    $("#start-button").on("click", () => {
        $.ajax({
            method: 'get',
            url: '/universities',
            success: startGame
        });

        var startTime = new Date();

        gameTimer = setInterval(() => {
            currentTime = new Date();
            timeDiff = Math.floor((currentTime - startTime) / 1000);
           $("#timer")[0].innerHTML = timeDiff;
        }, 1000)
    })

    $("#end-button").on("click", () => {
        endGame();
    })

    $("#confirm").on("click", () => {
        let selectedOption = $("#schools")[0].selectedOptions[0].innerHTML
        if (selectedOption == schoolList[schoolIndex].university_name) {
            if (schoolIndex < schoolList.length-1) {
                nextSchool();
            }
            else {
                endGame();
            }
        }
    });
});

function startGame(data) {
    schoolList = data;
    $("#location_counter").text(`Location: ${schoolIndex+1}/${schoolList.length}`);
    displayPhotoByUrl(schoolList[0].photo_url)
}

function endGame() {
    clearInterval(gameTimer);

    $.ajax({
        method: 'post',
        url: '/game',
        data: {
            user_id: 1, 
            score: 25, 
            duration: $("#timer")[0].innerHTML, 
            created_at: new Date(Date.now()).toISOString().replace('T',' ').replace('Z','')
        }
    });
}

function displayPhotoByUrl(url) {
    $("#campus-photo").attr("src", url);
}

function nextSchool() {
    schoolIndex ++;
    displayPhotoByUrl(schoolList[schoolIndex].photo_url);
    $("#location_counter").text(`Location: ${schoolIndex+1}/${schoolList.length}`);
}