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
        $(`<li>`)
          .html(
            `<b>Session id: ${highScoresList[i].session_id}, User_id: ${highScoresList[i].user_id}, Score: ${highScoresList[i].score}, Duration: ${highScoresList[i].duration.seconds}, Date: ${highScoresList[i].created_at}</b>
            `
          )
          .appendTo("ul");
      }
    },
  });
}
