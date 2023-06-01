
$(document).ready(function(){

    // Refresh nav bar highlighting
    $(".icon-container").hover(function() {
        $(this).find(".label-text").css("background-color", "black");
        $(this).find(".label-text").css("color", "white");
      }, function(){
        $(this).find(".label-text").css("background-color", "white");
        $(this).find(".label-text").css("color", "black");
    });

    // Redirect when an icon is clicked
    $("#about-icon").click(function() {
        window.location.href = "about";
    });
    $("#projects-icon").click(function() {
        window.location.href = "projects";
    });
    $("#blog-icon").click(function() {
        window.location.href = "blog";
    });
    
})