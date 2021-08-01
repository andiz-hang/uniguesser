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

    $("#register-tab").on("click", () => {
        $("#register-tab").addClass("selected-tab");
        $("#login-tab").removeClass("selected-tab");
        $("#login-form").hide();
        $("#registration-form").show();
    });

    $("#login-tab").on("click", () => {
        $("#login-tab").addClass("selected-tab");
        $("#register-tab").removeClass("selected-tab");
        $("#registration-form").hide();
        $("#login-form").show();
    });
});

