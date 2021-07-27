$(document).ready(function(){
    $("#home-button").on("click", () => {
        location.href = "/";
    });

    $("#game-button").on("click", () => {
        location.href = "/games";
    });

    $("#scores-button").on("click", () => {
        location.href = "/scores";
    });

    $("#logout-button").on("click", () => {
        $.ajax({
            method: "POST",
            url: "/auth/logout",
          });
        location.href = "/";
    });
});

