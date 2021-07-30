$(document).ready(function () {
  displayList();
});

function displayList() {
  $("ul").empty();

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
