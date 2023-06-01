
$(document).ready(function(){

    // Auto-generate cards linking to each project
    populateFooter();

})


function populateFooter() {

    // Fetch manifest with metadata for each project
    $.getJSON("/data/project-manifest.json", function(manifest) {

        // Iterate over headings
        for (const project in manifest) {

            // Outer link
            let card = $("<a href='${project.href}'>");

            // Div wrapper
            let cardWrapper = $("<div>").addClass("project-card");

            // Image
            let cardImage = $("<img src='${project.img-url}'>").addClass("project-card-img");

            // Text - title and description
            let cardText = $("<div>").addClass("project-card-text");
            let cardTitle = $("<h1>").addClass("project-card-title").text(project.title);
            let cardDescription = $("<p>").addClass("project-card-description").text(project.description);

            // Assemble card and add to page
            cardText.append(cardTitle);
            cardText.append(cardDescription);
            cardWrapper.append(cardImage);
            cardWrapper.append(cardText);
            card.append(cardWrapper);
            $("#projects-container").append(card);

        }

    });

}