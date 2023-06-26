
// Import packages
const express = require('express');
const path = require("path");
const fs = require("fs");
const showdown  = require('showdown');
const {JSDOM} = require('jsdom');


// Create and configure express app
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// Create and configure Showdown markdown converter
let converter = new showdown.Converter({
    "noHeaderId": true
});


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

    // Sort post manifest by date
    manifest.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Load the markdown for the 5 latest posts, render into html
    let postsHtml = "";
    let n = Math.min(5, manifest.length);
    for (let i=0; i<n; i++) {

        // Load post markdown, convert to html
        let postMd = fs.readFileSync(`posts/${manifest[i]["url"]}.md`, "utf8");
        let postHtml = converter.makeHtml(postMd);

        // Wrap the post in a div
        let postClass = i + 1 === n ? 'post post-final' : 'post'
        postHtml = `<div class="${postClass}">${postHtml}</div>`

        // Apply permalink to the post title
        postHtml = applyPermalink(postHtml, manifest[i]["url"]);

        // Add to full html post block
        postsHtml += postHtml;

    }

    // Render blog home page and return
    response.render("blog-home", {
        postHtml: postsHtml
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
    let postHtml = `<div class='post post-final'>${converter.makeHtml(post)}</div>`;

    // Render blog home page and return
    response.render("blog-home", {
        postHtml: postHtml
    });

})


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


// Run the webserver - use environment variable if set, otherwise
// use port 8080
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});