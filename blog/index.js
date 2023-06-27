
// Import packages
const express = require('express');
const favicon = require('serve-favicon')
const path = require("path");
const fs = require("fs");
const showdown  = require('showdown');
const {JSDOM} = require('jsdom');


// ----------------- //
// ----- SETUP ----- //
// ----------------- //


// Create and configure express app
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// Create and configure Showdown markdown converter
let converter = new showdown.Converter({
    "noHeaderId": true
});


// Load manifest and card data for quick access
const blogManifest = loadManifest();
const cardData = loadCardData(blogManifest);
const cardDefaultsRaw = fs.readFileSync("static/json/card-defaults.json", "utf8");
const cardDefaults = JSON.parse(cardDefaultsRaw);


// ---------------------------- //
// ----- REQUEST HANDLING ----- //
// ---------------------------- //


/**
 * Serve favicon
 */
app.use(favicon(path.join(__dirname, 'static', 'img', 'favicon.ico')))


/**
 * Serve static files (CSS, JavaScript, JSON data, images)
 */
app.use('/static', express.static("static"));


/**
 * Request handler for the main blog page. Responds to GET
 * requests to the / endpoint. Renders main.ejs with the main
 * page content set to a handful of the most recent posts
 */
app.get("/", function (request, response) {

    // Load the markdown for the 5 latest posts, render into html
    let postsHtml = "";
    let n = Math.min(5, blogManifest.length);
    for (let i=0; i<n; i++) {

        // Load post markdown, convert to html
        let postMd = fs.readFileSync(`posts/${blogManifest[i]["url"]}.md`, "utf8");
        let postHtml = converter.makeHtml(postMd);

        // Wrap the post in a div
        let postClass = i + 1 === n ? 'post post-final' : 'post'
        postHtml = `<div class="${postClass}">${postHtml}</div>`

        // Apply permalink to the post title
        postHtml = applyPermalink(postHtml, blogManifest[i]["url"]);

        // Add to full html post block
        postsHtml += postHtml;

    }

    // Render blog home page and return
    response.render("main", {
        mainContent: postsHtml,
        title: cardDefaults["main"]["title"],
        description: cardDefaults["main"]["description"],
        pageUrl: cardDefaults["main"]["pageUrl"],
        imgUrl: cardDefaults["main"]["imgUrl"],
    });

})


/**
 * Request handler for the individual post permalinks. Responds to GET
 * requests to the /post/<post-id> endpoint. Renders main.ejs with the
 * main page content set to the requested post
 */
app.get("/post/:post", function (request, response) {

    // Load the markdown for specified post
    const post = fs.readFileSync(`posts/${request.params.post}.md`, "utf8");

    // Convert the post markdown to html
    let postHtml = `<div class='post post-final'>${converter.makeHtml(post)}</div>`;

    // Get the card data for this post
    const postCardData = cardData[request.params.post];

    // Render blog home page and return
    response.render("main", {
        mainContent: postHtml,
        title: postCardData["title"],
        description: postCardData["description"],
        pageUrl: postCardData["pageUrl"],
        imgUrl: postCardData["imgUrl"],
    });

})


/**
 * Request handler for blog archive page. Responds to GET
 * requests to the /archive endpoint. Renders main.ejs with the
 * main page content set to a list of links to every post in the archive
 */
app.get("/archive", function (request, response) {

    // Convert the post markdown to html
    let postArchive = `<h2>All Posts</h2>`;
    postArchive += `<ul id="post-archive-list">`

    // Add a list item for each post in archive
    for (post of blogManifest) {

        // Format the post's date
        let date = new Date(post["date"]);
        let formattedDate = date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        // Create link to the post and add it to the list
        const text = `${post["title"]} (${formattedDate})`;
        const url = `/post/${post["url"]}`;
        postArchive += `<li><a href="${url}">${text}</a></li>`;

    }

    postArchive += `</ul>`

    // Render blog home page and return
    response.render("main", {
        mainContent: postArchive,
        title: cardDefaults["archive"]["title"],
        description: cardDefaults["archive"]["description"],
        pageUrl: cardDefaults["archive"]["pageUrl"],
        imgUrl: cardDefaults["archive"]["imgUrl"],
    });

})


// ---------------------------- //
// ----- HELPER FUNCTIONS ----- //
// ---------------------------- //


function applyPermalink(htmlString, linkHref) {

    // Convert html to virtual dom so we can manipulate it
    let dom = new JSDOM(htmlString);
    let document = dom.window.document;

    // Get the h1 tag (there should only ever be 1)
    let h1 = document.getElementsByTagName('h1')[0];

    // Create an <a> tag around the h1 text
    let a = document.createElement('a');
    a.textContent = h1.textContent;
    a.href = `post/${linkHref}`
    h1.textContent = '';
    h1.appendChild(a);

    // Return the modified html as a string
    return dom.serialize();

}


function loadManifest() {

    // Load the blog post manifest
    const manifestRaw = fs.readFileSync("static/json/manifest.json", "utf8");
    const manifest = JSON.parse(manifestRaw);

    // Sort post manifest by date
    manifest.sort((a, b) => new Date(b.date) - new Date(a.date));

    return manifest;

}


function loadCardData(manifest) {

    const urlPrefix = "https://blog.jakegloudemans.com";

    let cardData = {};
    for (postData of manifest) {
        cardData[postData["url"]] = {
            "title": `${postData["title"]} - Jake Gloudemans`,
            "description": postData["cardDescription"],
            "pageUrl": `${urlPrefix}/post/${postData["url"]}`,
            "imgUrl": `${urlPrefix}/static/img/cards/${postData["cardImgUrl"]}`
        }
    }

    return cardData;

}


// ------------------------- //
// ----- RUN WEBSERVER ----- //
// ------------------------- //


// Get port from env variable if set, otherwise use port 8080
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});