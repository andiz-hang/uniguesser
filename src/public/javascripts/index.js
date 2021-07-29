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

    $("#gallery-button").on("click", () => {
        location.href = "/gallery";
    });

    $("#logout-button").on("click", () => {
        $.ajax({
            method: "POST",
            url: "/auth/logout",
          });
        location.href = "/";
    });
});

