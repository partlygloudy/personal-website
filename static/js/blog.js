
/**
 * This function is called when the page finishes loading. Any functions required
 * for loading/rendering the page should be added here, and all default event listeners
 * should be attached here
 */
$(document).ready(function() {

    // Fetch text blurbs from the server and populate elements from the data
    populateArchivePanel();

    // Load the most recent article
    loadMostRecent();

});


/**
 * This method fetches a JSON object containing a list of recent blog posts to
 * show links to in the "recent" side panel. This won't include all blog posts,
 * only the most recent 10 or so. The JSON will include the title and url to use
 * when creating the article link
 */
function populateArchivePanel() {

    // Fetch list of recent articles from the server
    $.getJSON("/data/recent.json", function(recent) {

        // Iterate over headings
        for (const post in recent) {

            // Read title and URL from JSON
            let title = recent[post]["title"];
            let url = recent[post]["url"];

            // Create link to the post and add it to the list
            let link = $("<a>").attr("url", url).html(title);
            $("#archive-panel-recent").append($("<li>").html(link));

        }

    });

}


function loadMostRecent() {

    // Fetch blurb text from the server
    $.getJSON("data/recent.json", function(recent) {

        // Get the url of the most recent article
        let mostRecentUrl = Object.values(recent)[0]["url"];

        // Request the article page from the server
        $.get(mostRecentUrl, function(page) {

            $("#current-post-wrapper").html(
                $(page).find("#current-post-wrapper").html()
            );

            // Add hyperlink to the title
            let title = $("#current-post-title").html();
            let linkedTitle = $("<a>").attr("href", mostRecentUrl).html(title)
            $("#current-post-title").html(linkedTitle);

        });



    });

}
