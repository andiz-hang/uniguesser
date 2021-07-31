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
        $(`<tr>`)
          .html(
            `<td>${highScoresList[i].username}</td>
            <td>${highScoresList[i].score}</td>
            <td>${highScoresList[i].duration.minutes}:${highScoresList[i].duration.seconds}</td>
            <td>${highScoresList[i].created_at}</td>
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
          $(`<tr>`)
            .html(
              `<td>${highScoresList[i].username}</td>
              <td>${highScoresList[i].score}</td>
              <td>${highScoresList[i].duration.minutes}:${highScoresList[i].duration.seconds}</td>
              <td>${highScoresList[i].created_at}</td>
              <td>${highScoresList[i].country}</td>
              `
            )
            .appendTo("table");
        }
      },
    });
  } else if (selectedValue == "Global") {
    displayList();
  }
}
