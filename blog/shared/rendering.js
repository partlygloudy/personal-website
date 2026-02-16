const showdown = require('showdown');
const {JSDOM} = require('jsdom');


function createConverter() {
    return new showdown.Converter({
        "noHeaderId": true,
        "tables": true
    });
}


function applyLinks(htmlString, permaHref, mailtoHref) {

    // Convert html to virtual dom so we can manipulate it
    let dom = new JSDOM(htmlString);
    let document = dom.window.document;

    // Apply permalink if one provided
    if (permaHref !== "") {

        // Get the h1 tag (there should only ever be 1)
        let h1 = document.getElementsByTagName('h1')[0];

        // Create an <a> tag around the h1 text
        let perma = document.createElement('a');
        perma.textContent = h1.textContent;
        perma.href = `post/${permaHref}`
        h1.textContent = '';
        h1.appendChild(perma);

    }

    // Apply email reply link if one provided
    if (mailtoHref !== "") {

        // Append email reply link to the end
        let replyWrapper = document.createElement('div');
        replyWrapper.className = "reply-link-wrapper";
        let reply = document.createElement('a');
        reply.textContent = "reply to this post";
        reply.className = "reply-link";
        reply.href = `mailto:jake.gloudemans+blog@gmail.com?subject=re: ${mailtoHref}`
        replyWrapper.appendChild(reply)
        document.body.appendChild(replyWrapper);

    }

    // Apply classes to images using |class syntax in alt text
    let images = document.getElementsByTagName('img');
    for (let img of images) {
        let alt = img.getAttribute('alt') || '';
        let match = alt.match(/^(.*?)\|(\S+)$/);
        if (match) {
            img.setAttribute('alt', match[1]);
            img.classList.add(match[2]);
        }
    }

    // Return the modified html as a string
    return dom.serialize();

}


module.exports = { createConverter, applyLinks };
