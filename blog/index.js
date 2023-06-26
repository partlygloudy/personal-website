
// Import packages
const express = require('express');
const path = require("path");
const fs = require("fs");
const showdown  = require('showdown');


// Create and configure express app
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// Create and configure Showdown markdown converter
let converter = new showdown.Converter();


/**
 * Request handler for all static file requests
 */
app.use('/static', express.static("static"));


/**
 * Request handler for the main blog page. Responds to GET
 * requests to the / endpoint. Renders blog-home.ejs
 */
app.get("/", function (request, response) {

    // Load the blog post manifest
    const manifestRaw = fs.readFileSync("static/manifest.json", "utf8");
    const manifest = JSON.parse(manifestRaw);

    // Load the markdown for the latest post
    manifest.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latest = fs.readFileSync(`posts/${manifest[0]["url"]}.md`, "utf8");

    // Convert the post markdown to html
    let postHtml = converter.makeHtml(latest);

    // Render blog home page and return
    response.render("blog-home", {
        postHtml: postHtml
    });

})


/**
 * Request handler for the individual post permalinks. Responds to GET
 * requests to the /post/<post-id> endpoint
 */
app.get("/post/:post", function (request, response) {

    // Load the markdown for specified post
    const post = fs.readFileSync(`posts/${request.params.post}.md`, "utf8");

    // Convert the post markdown to html
    let postHtml = converter.makeHtml(post);

    // Render blog home page and return
    response.render("blog-home", {
        postHtml: postHtml
    });

})


// Run the webserver - use environment variable if set, otherwise
// use port 8080
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});