var schoolList = [];
var schoolIndex = 0;
var gameTimer;
var score = 0;
var firstAttempt = true;

const playSound = (soundFile) => {
  const audio = new Audio(soundFile);
  audio.play();
}

const playSuccess = () => playSound('sound/score.wav')
const playMiss = () => playSound('sound/miss.wav')
const playStartGame = () => playSound('sound/startgame.wav')

$(document).ready(function () {
  $("#start-button").on("click", () => {
    $("#overlay").hide();
    startGame();
    playStartGame()
  });

  $("#replay-button").on("click", () => {
    location.href = "/games";
  });

  $("#end-button").on("click", () => {
    endGame();
  });

  $("#selection-form").on("submit", (event) => {
    event.preventDefault();
    let answer = $("input[name='selected-school']:checked").val();
    checkAnswer(answer);
  });

  $("#logout-button").on("click", () => {
    $.ajax({
      method: "POST",
      url: "/auth/logout",
    });
    location.href = "/";
  });
});

function checkAnswer(answer) {
  if (answer == schoolList[schoolIndex].university_name) {
    score++;

    $("#score")[0].innerHTML = score;
    setTimeout(() => { alert("Correct Guess!"); }, 3000);
    playSuccess();
  } else {
    setTimeout(() => { alert("Incorrect Guess"); }, 3000);
    playMiss();
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
    url: "/schools",
    success: (data) => {
      schoolList = data;
      $("#location_counter").text(
        `Location: ${schoolIndex + 1}/${schoolList.length}
        `
      );

      getPhoto(schoolList[0]["photo_ref"]);

      var startTime = new Date();

      gameTimer = setInterval(() => {
        currentTime = new Date();
        timeDiff = Math.floor((currentTime - startTime) / 1000);
        $("#timer")[0].innerHTML = timeDiff;
      }, 1000);

      $("#start-button")[0].innerHTML = "Play again";
    },
  });
}

function getPhoto(photoRef) {
  $.ajax({
    method: "get",
    url: "/schools/" + photoRef,
    success: (data) => {
      displayPhoto(data);
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
    success: displayOverlay(),
  });
}

async function displayPhoto(image) {
  // reference: https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
  var img = new Image();
  var data = btoa(String.fromCharCode(...new Uint8Array(image.buff.data)));
  img.src = "data:image/jpeg;base64," + data;
  img.height = "395";
  img.id = "campus-photo";
  $("#campus-photo").replaceWith(img);
  $("#campus-photo").show();
}

function nextSchool() {
  $("input[name='selected-school']").attr("checked", false);
  schoolIndex++;
  getPhoto(schoolList[schoolIndex].photo_ref);
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

  clearInterval(gameTimer);
  $("#timer")[0].innerHTML = 0;
  $("#score")[0].innerHTML = 0;
  $("#location_counter").text("");
}
