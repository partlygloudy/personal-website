
let menuOpen = false;

/**
 * This function is called when the page finishes loading. Any functions required
 * for loading/rendering the page should be added here, and all default event listeners
 * should be attached here
 */
$(document).ready(function() {

    // Load recent posts, recommended blogs, and recommended publication panels
    populateRecentPanel();
    populateBlogsPanel();
    populatePubsPanel();
    populatePodcastsPanel();

    // Add click handlers to logo and name, redirecting to blog home
    $("#header-logo, #header-title").click(() => {
        window.location.href = '/';
    });

    // Add click handlers for menu toggle button
    $("#menu-button-open").click(openMenu);
    $("#menu-button-close").click(closeMenu);

});


/**
 * This method fetches a JSON object containing a list of recent blog posts to
 * show links to in the "recent" side panel. This won't include all blog posts,
 * only the most recent 10 or so. The JSON will include the title and url to use
 * when creating the article link
 */
function populateRecentPanel() {

    // Fetch list of recent articles from the server
    $.getJSON("/static/json/manifest.json", function(recent) {

        // Iterate over headings
        for (const post of recent.slice(0, 10)) {

            // Format the post's date
            let date = new Date(post["date"]);
            let formattedDate = date.toLocaleDateString("en-US", {
                month: 'short',
                day: 'numeric'
            });

            // Read title and URL from JSON
            let text = `${post["title"]} (${formattedDate})`;
            let url = `/post/${post["url"]}`;

            // Create link to the post and add it to the list
            let link = $("<a>").attr("href", url).html(text);
            $("#archive-panel-recent").append($("<li>").html(link));

        }

    });

}


function populateBlogsPanel() {

    // Fetch list of recent articles from the server
    $.getJSON("/static/json/recommended-blogs.json", function(blogs) {

        // Iterate over headings
        for (const key of Object.keys(blogs)) {

            // Read URL and title from JSON
            let url = key;
            let title = blogs[key];

            // Create link to each blog and add to the list
            let link = $(`<a href='${url}'>${title}</a>`)
                .addClass("archive-panel-link-external")
                .attr("target", "_blank")
            $("#archive-panel-blogs").append($("<li>").html(link));

        }

    });

}

function populatePubsPanel() {

    // Fetch list of recent articles from the server
    $.getJSON("/static/json/recommended-pubs.json", function(pubs) {

        // Iterate over headings
        for (const key of Object.keys(pubs)) {

            // Read URL and title from JSON
            let url = key;
            let title = pubs[key];

            // Create link to each blog and add to the list
            let link = $(`<a href='${url}'>${title}</a>`)
                .addClass("archive-panel-link-external")
                .attr("target", "_blank")
            $("#archive-panel-pubs").append($("<li>").html(link));

        }

    });

}

function populatePodcastsPanel() {

    // Fetch list of recommended podcasts from the server
    $.getJSON("/static/json/recommended-podcasts.json", function(podcasts) {

        // Iterate over headings
        for (const key of Object.keys(podcasts)) {

            // Read URL and title from JSON
            let url = key;
            let title = podcasts[key];

            // Create link to each podcast and add to the list
            let link = $(`<a href='${url}'>${title}</a>`)
                .addClass("archive-panel-link-external")
                .attr("target", "_blank")
            $("#archive-panel-podcasts").append($("<li>").html(link));

        }

    });

}


function openMenu() {

    // Show the menu panel and hide blog posts, toggle which button is visible
    $(".hidden").removeClass("hidden");
    $("#post-bucket, #menu-button-open").addClass("hidden");

}


function closeMenu() {

    // Show the blog posts and hide menu panel, toggle which button is visible
    $(".hidden").removeClass("hidden");
    $("#archive-panel, #menu-button-close").addClass("hidden");

}

