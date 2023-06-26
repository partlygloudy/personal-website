
// Import packages
const express = require('express');


// Create and configure express app
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


/**
 * Request handler for all static file requests
 */
app.use('/static', express.static("static"));


/**
 * Request handler for the main blog page. Responds to GET
 * requests to the / endpoint. Renders blog-home.ejs
 */
app.get("/", function (request, response) {

    // Render blog home page and return
    response.render("blog-home");

})


// Run the webserver - use environment variable if set, otherwise
// use port 8080
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});