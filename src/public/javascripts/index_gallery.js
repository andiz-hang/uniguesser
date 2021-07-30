function getDesc(id) {
    $.ajax({
        method: "GET",
        url: `/gallery/`+id, 
        success: desc => {
            $("article").empty();
            $("article").html(desc);

            $("img").attr("src", "images/logo_"+id+".png");
        }
    });
}

$(document).ready(function () {
    $("#logout-button").on("click", () => {
      $.ajax({
          method: "POST",
          url: "/auth/logout",
        });
      location.href = "/";
    });
});