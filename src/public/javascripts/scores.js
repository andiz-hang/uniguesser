$(document).ready(function () {
  displayList();
});

function displayList() {
  var mytbl = document.getElementById("high_score_table");
  mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;

  $.ajax({
    method: "get",
    url: "/scores/list",
    success: (data) => {
      highScoresList = data;
      for (let i = 0; i < highScoresList.length; i++) {
        if (!highScoresList[i].duration.minutes) {
          highScoresList[i].duration.minutes = "0";
        }
      }

      for (let i = 0; i < highScoresList.length; i++) {
        // Referred to https://stackoverflow.com/questions/13622142/javascript-to-convert-utc-to-local-time for help with handling dates
        let offset = new Date().getTimezoneOffset();
        let sessionTimestamp = new Date(highScoresList[i].created_at)
        sessionTimestamp.setMinutes(sessionTimestamp.getMinutes() - offset);
        let formattedString = formatDateString(sessionTimestamp);

        let durationSeconds = highScoresList[i].duration.seconds >= 10 ? `${highScoresList[i].duration.seconds}` : `0${highScoresList[i].duration.seconds}`

        $(`<tr>`)
          .html(
            `<td>${highScoresList[i].username}</td>
            <td>${highScoresList[i].score}</td>
            <td>${highScoresList[i].duration.minutes}:${durationSeconds}</td>
            <td>${formattedString}</td>
            <td>${highScoresList[i].country}</td>
            `
          )
          .appendTo("table");
      }
    },
  });
}

function displayListByCountry() {
  var mytbl = document.getElementById("high_score_table");
  mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;

  $.ajax({
    method: "get",
    url: "/scores/country-list",
    success: (data) => {
      highScoresList = data;
      for (let i = 0; i < highScoresList.length; i++) {
        if (!highScoresList[i].duration.minutes) {
          highScoresList[i].duration.minutes = "0";
        }
      }

      for (let i = 0; i < highScoresList.length; i++) {
        // Referred to https://stackoverflow.com/questions/13622142/javascript-to-convert-utc-to-local-time for help with handling dates
        let offset = new Date().getTimezoneOffset();
        let sessionTimestamp = new Date(highScoresList[i].created_at)
        sessionTimestamp.setMinutes(sessionTimestamp.getMinutes() - offset);
        let formattedString = formatDateString(sessionTimestamp);

        let durationSeconds = highScoresList[i].duration.seconds >= 10 ? `${highScoresList[i].duration.seconds}` : `0${highScoresList[i].duration.seconds}`

        $(`<tr>`)
          .html(
            `<td>${highScoresList[i].username}</td>
            <td>${highScoresList[i].score}</td>
            <td>${highScoresList[i].duration.minutes}:${durationSeconds}</td>
            <td>${formattedString}</td>
            <td>${highScoresList[i].country}</td>
            `
          )
          .appendTo("table");
      }
    },
  });
}

function changeFunc() {
  var selectBox = document.getElementById("high_score_select");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;

  if (selectedValue == "Personal") {
    var mytbl = document.getElementById("high_score_table");
    mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;
    $.ajax({
      method: "get",
      url: "/scores/personallist",
      success: (data) => {
        highScoresList = data;
        for (let i = 0; i < highScoresList.length; i++) {
          if (!highScoresList[i].duration.minutes) {
            highScoresList[i].duration.minutes = "0";
          }
        }

        for (let i = 0; i < highScoresList.length; i++) {
          // Referred to https://stackoverflow.com/questions/13622142/javascript-to-convert-utc-to-local-time for help with handling dates
          let offset = new Date().getTimezoneOffset();
          let sessionTimestamp = new Date(highScoresList[i].created_at)
          sessionTimestamp.setMinutes(sessionTimestamp.getMinutes() - offset);
          let formattedString = formatDateString(sessionTimestamp);

          let durationSeconds = highScoresList[i].duration.seconds > 10 ? `${highScoresList[i].duration.seconds}` : `0${highScoresList[i].duration.seconds}`

          $(`<tr>`)
            .html(
              `<td>${highScoresList[i].username}</td>
              <td>${highScoresList[i].score}</td>
              <td>${highScoresList[i].duration.minutes}:${durationSeconds}</td>
              <td>${formattedString}</td>
              <td>${highScoresList[i].country}</td>
              `
            )
            .appendTo("table");
        }
      },
    });
  } else if (selectedValue == "Global") {
    displayList();
  }  else if (selectedValue == "National") {
    displayListByCountry();
  }
}

function formatDateString(date) {
  // month is zero indexed
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();



  let dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  return dateString;
}