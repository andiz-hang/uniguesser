$(document).ready(function(){
    $("#start-button").on("click", () => {
        location.href = "/games";
    })

    $("#highscore-button").on("click", () => {
        location.href = "/scores";
    })
});

