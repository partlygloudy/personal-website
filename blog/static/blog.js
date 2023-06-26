
/**
 * This function is called when the page finishes loading. Any functions required
 * for loading/rendering the page should be added here, and all default event listeners
 * should be attached here
 */
$(document).ready(function() {

    // Fetch text blurbs from the server and populate elements from the data
    populateRecentPanel();

});


/**
 * This method fetches a JSON object containing a list of recent blog posts to
 * show links to in the "recent" side panel. This won't include all blog posts,
 * only the most recent 10 or so. The JSON will include the title and url to use
 * when creating the article link
 */
function populateRecentPanel() {

    // Fetch list of recent articles from the server
    $.getJSON("/static/manifest.json", function(recent) {

        // Iterate over headings
        for (const post of recent) {

            console.log(post);

            // Read title and URL from JSON
            let title = post["title"];
            let url = `/post/${post["url"]}`;

            // Create link to the post and add it to the list
            let link = $("<a>").attr("href", url).html(title);
            $("#archive-panel-recent").append($("<li>").html(link));

        }

    });

}

