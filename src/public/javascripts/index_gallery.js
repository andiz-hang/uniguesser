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