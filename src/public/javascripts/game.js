var schoolList = [];
var schoolIndex = 0;
var gameTimer;
var score = 0;
var firstAttempt = true;

$(document).ready(function () {
  $("#start-button").on("click", () => {
    $("#overlay").hide();
    startGame();
  });

  $('#replay-button').on("click", () =>{
    location.href = "/games";
  });

  $("#end-button").on("click", () => {
    endGame();
  });

  $("#selection-form").on("submit", event => {
    event.preventDefault();
    let answer = $("input[name='selected-school']:checked").val();
    checkAnswer(answer);
  });
});

function checkAnswer(answer) {
  if (answer == schoolList[schoolIndex].university_name) {
    score++;
    
    $("#score")[0].innerHTML = score;
  }
  if (schoolIndex < schoolList.length - 1) {
    nextSchool();
  } else {
    endGame();
  }
}


function startGame() {
  clearGameStats();

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

      $("#start-button")[0].innerHTML = "Play again"
    },
  });
}

function endGame() {
  clearInterval(gameTimer);

  $.ajax({
    method: "post",
    url: "/games",
    data: {
      score: score,
      duration: $("#timer")[0].innerHTML,
      created_at: new Date(Date.now()) //Reference: https://gist.github.com/jczaplew/f055788bf851d0840f50
        .toISOString()
        .replace("T", " ")
        .replace("Z", ""),
    },
    success: displayOverlay()
  });
}

function displayPhotoByUrl(url) {
  var img = new Image();
  img.src = url;
  img.height = "395";
  img.id = "campus-photo";
  $("#campus-photo").replaceWith(img);
  $("#campus-photo").show();
}

function nextSchool() {
  $("input[name='selected-school']").attr('checked', false);
  schoolIndex++;
  displayPhotoByUrl(schoolList[schoolIndex].photo_url);
  $("#location_counter").text(
    `Location: ${schoolIndex + 1}/${schoolList.length}`
  );
}

function displayOverlay() {
  $("#overlay").show();
}

function clearGameStats() {
  score = 0;
  schoolIndex = 0;
  $("#campus-photo").hide();

  clearInterval(gameTimer)
  $("#timer")[0].innerHTML = 0;
  $("#score")[0].innerHTML = 0;
  $("#location_counter").text("");
}