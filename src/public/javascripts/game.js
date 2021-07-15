var schoolList = [];
var schoolIndex = 0;
var gameTimer;
var score = 0;

$(document).ready(function(){
    startGame();

    $("#end-button").on("click", () => {
        endGame();
    })

    $("#confirm").on("click", () => {
        let selectedOption = $("#schools")[0].selectedOptions[0].innerHTML
        if (selectedOption == schoolList[schoolIndex].university_name) {
            score++;
            $("#score")[0].innerHTML = score;
        }
        if (schoolIndex < schoolList.length-1) {
            nextSchool();
        }
        else {
            endGame();
        }
    });
});


function startGame() {
    $.ajax({
        method: 'get',
        url: '/universities',
        success: data => {
            schoolList = data;
            $("#location_counter").text(`Location: ${schoolIndex+1}/${schoolList.length}`);
            displayPhotoByUrl(schoolList[0].photo_url)

            var startTime = new Date();

            gameTimer = setInterval(() => {
                currentTime = new Date();
                timeDiff = Math.floor((currentTime - startTime) / 1000);
               $("#timer")[0].innerHTML = timeDiff;
            }, 1000)
        }
    });
}

function endGame() {
    clearInterval(gameTimer);

    $.ajax({
        method: 'post',
        url: '/game',
        data: {
            user_id: 1, 
            score: score, 
            duration: $("#timer")[0].innerHTML, 
            created_at: new Date(Date.now()).toISOString().replace('T',' ').replace('Z','')
        }
    });

    location.href = "/";
}

function displayPhotoByUrl(url) {
    $("#campus-photo").attr("src", url);
}

function nextSchool() {
    schoolIndex ++;
    displayPhotoByUrl(schoolList[schoolIndex].photo_url);
    $("#location_counter").text(`Location: ${schoolIndex+1}/${schoolList.length}`);
}