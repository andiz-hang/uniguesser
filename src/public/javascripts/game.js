var schoolList = [];
var schoolIndex = 0;
var gameTimer;
var score = 0;
var firstAttempt = true;

$(document).ready(function () {
  $("#start-button").on("click", () => {
    if (firstAttempt) {
      firstAttempt = false;
      startGame();
    }
  });

  $("#end-button").on("click", () => {
    endGame();
  });

  $("#confirm").on("click", () => {
    let selectedOption = $("#schools")[0].selectedOptions[0].innerHTML;
    if (selectedOption == schoolList[schoolIndex].university_name) {
      score++;
      $("#score")[0].innerHTML = score;
    }
    if (schoolIndex < schoolList.length - 1) {
      nextSchool();
    } else {
      endGame();
    }
  });
});

function startGame() {
  $.ajax({
    method: "get",
    url: "/universities",
    success: (data) => {
      schoolList = data;
      $("#location_counter").text(
        `Location: ${schoolIndex + 1}/${schoolList.length}`
      );
      displayPhotoByUrl(schoolList[0].photo_url);

      var startTime = new Date();

      gameTimer = setInterval(() => {
        currentTime = new Date();
        timeDiff = Math.floor((currentTime - startTime) / 1000);
        $("#timer")[0].innerHTML = timeDiff;
      }, 1000);
    },
  });
}

function endGame() {
  clearInterval(gameTimer);

  $.ajax({
    method: "post",
    url: "/games",
    data: {
      user_id: 1,
      score: score,
      duration: $("#timer")[0].innerHTML,
      created_at: new Date(Date.now()) //Reference: https://gist.github.com/jczaplew/f055788bf851d0840f50
        .toISOString()
        .replace("T", " ")
        .replace("Z", ""),
    },
    success: displayNotification("Score saved. Redirecting to home page in 3 seconds..."),
    error: displayNotification("Couldn't save your score. Redirecting to home page in 3 seconds...")
  });
}

function displayPhotoByUrl(url) {
  $("#campus-photo").attr("src", url);
}

function nextSchool() {
  schoolIndex++;
  displayPhotoByUrl(schoolList[schoolIndex].photo_url);
  $("#location_counter").text(
    `Location: ${schoolIndex + 1}/${schoolList.length}`
  );
}

function displayNotification(message) {
  $('#overlay').show();
  $("#notification").text(message);


  setTimeout(() => {
    $("#notification").text("");
    $('#overlay').hide();
    location.href = "/";
  }, 3000);
}