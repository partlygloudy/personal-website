
// Globals
let blurbs = {};
let selected = false;

window.onload = function() {

    // Get blurbs JSON
    $.getJSON("/static/json/blurbs.json", function(data) {
        blurbs = data;
    });

    // Add hover and click handlers to icons
    $("#icon-about").click(iconClick);
    $("#icon-blog").click(blogClick);
    $("#icon-projects").click(projectsClick);
    $("#icon-support").click(supportClick);
    $(".icon").hover(iconHoverIn, iconHoverOut);

    // Add click handler to body for return clicks
    $("body").click(bodyClick);

    // Fade icons in left to right
    $("#name-text").delay(200).fadeTo(600, 1.0);
    $("#icon-about").delay(100).fadeTo(600, 1.0);
    $("#icon-projects").delay(200).fadeTo(600, 1.0);
    $("#icon-blog").delay(300).fadeTo(600, 1.0);
    $("#icon-support").delay(400).fadeTo(600, 1.0);

}


function iconHoverIn() {
    $(this).find(".icon-text").fadeTo(200, 1.0);
}


function iconHoverOut() {
    $(this).find(".icon-text").fadeTo(200, 0.0);
}


function updateBlurb(blurbKey) {

    // Remove the current blurb
    $("#blurb-text-wrapper").empty();

    // Add new blurb
    for (pText of blurbs[blurbKey]) {
        let p = `<p class="blurb-paragraph">${pText}</p>`
        $("#blurb-text-wrapper").append(p);
    }

}

 function iconClick() {

    // Fade out icons
    $("#icon-wrapper, #name-text").fadeOut(200).promise().done(() => {

        // Get the blurb id
        let id = this.id.replace("icon-", "");

        // Update the blurb image
        $("#blurb-img").attr("src", `/static/img/index/portrait-${id}.png`)

        // Update the blurb text
        updateBlurb(id);

        // Fade in the blurb
        $("#blurb-wrapper").fadeIn(200);

        // Listen for any clicks to return
        selected = true;
        $("body").css("cursor", "pointer");

    });

}


function bodyClick() {

    // If an icon was selected, return to menu
    if (selected) {

        // Fade out blurb
        $("#blurb-wrapper").fadeOut(200).promise().done(() => {

            // Fade in the icons
            $("#icon-wrapper, #name-text").fadeIn(200);

            // Stop listening for return clicks
            selected = false;
            $("body").css("cursor", "unset");

        });

    }

}


function blogClick() {
    window.location.href = "https://blog.jakegloudemans.com";
}


function projectsClick() {
    window.location.href = "projects";
}

function supportClick() {
    window.location.href = "support";
}