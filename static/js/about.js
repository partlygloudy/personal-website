
var skills_blurbs = {

    "python": "Used for most of my software projects. I'm familiar with many popular packages including Numpy, Matplotlib, OpenCV, TensorFlow, and am comfortable learning new ones as needed. I'm also familiar with other Python tools like virtual environments, notebooks, and Anaconda",
    "electronics": "I have experience working with a wide selection of sensors, actuators, and other components and am very comfortable designing, assembling, and testing electrical systems - most of my experience is with robotics where there are also software and mechanical design aspects to consider",
    "microcontrollers": "Most of my projects involve microcontrollers - typically an Arduino / Arduino-variant or a Raspberry Pi but I've also worked with the Teensy, Nvidia Jetson TX2 & Nano, and probably a few others. I'm familiar with interrupts, analog-digital conversion, and common communication protocols including I2C, SPI, and UART",
    "soldering": "Lots of experience with through-hole soldering, a little with surface mount soldering",
    "3d printing": "I've used 3D printers extensively for many different projects - I've mostly used a Prusa i3 MK3 (PLA, PETG) and Markforged Mark 2 (Nylon, Onyx) and have occasionally used MakerBot, Ultimaker, and Creality printers",
    "woodworking": "I'm comfortable with many woodworking tools - table saw, miter saw, band saw, jointer, planer, router, drill press, various sanders and others. I feel completely at home in a shop!",
    "software design fundamentals": "I have coursework and project experience with essential data structures, algorithms, design patterns, and object-oriented programming principles",
    "probability and statistics": "I'm comfortable with fundamental probability concepts including random variables, distributions, conditional probability, and expected value and statistics concepts such as bias, variance, estimators, sampling, hypothesis testing, and confidence intervals",

    "c++": "C++ is the programming language I have the second most experience with behind Python. I've taken several C++-based computer science courses and am familiar with key data structures, design patterns, templates, and some newer features like unique/shared pointers. I have a few months of experience working with Eigen.",
    "robot operating system": "I've used ROS for several projects and have a strong understanding of core principles - publishers/subscribers, messages, services, parameters, packages, launch files. I haven't used it much in the last year or so but will likely use it for upcoming projects.",
    "machining": "I took a course in machining and have project experience using a mill, lathe, bandsaw, and handheld machining tools. I've also worked with a CNC mill and am familiar with the general CNC workflow and important considerations",
    "calculus": "Coursework (Calc 1-3 and Multivariate Calc) and some applied use, mainly in the context of physics problems and computer science subfields like machine learning. I have a solid understanding of core principles but need a refresher on some of the more advanced concepts, particularly multivariate / vector calculus",
    "differential equations": "I took a differential equations course and used some principles for other classes (signals, control systems) but have little applied use. Definitely need a refresher (and I'm planning one soon)",
    "linear algebra": "Solid understanding a the fundamentals from coursework and application, mainly image processing and deep learning programming applications. However beyond basic matrix operations I haven't used it much recently, so I'm rusty on anything more advanced than that",
    "machine learning": "I've taken a handful of related courses, both online and at university so I'm very familiar with the general concepts behind the field as well as standard algorithms - decision trees & forests, bayes classifiers, regression, SVMs, neural networks, others - however, aside from neural networks, I haven't used many of these recently",

    "web development": "I've picked up a solid web dev foundation over the years by putting together a handful of websites. I'm good with HTML and CSS - if I know how I want a page to look, I can get it to look that way - and have workable JavaScript ability. I'm familiar with Flask (Python) for backend and Google Cloud Services for hosting/storage (specifically App Engine, Firestore, and Cloud Storage).",
    "deep learning": "I'm familiar with essential concepts like backprop, optimizers, activations, loss functions, regularization, dropout, and dataset augmentation. I've implemented a basic feedforward network completely from scratch using numpy and done several projects using different architectures. I have a conceptual grasp of GANs and recurrent networks but haven't used/implemented them",
    "reinforcement learning": "I've worked through much of the OpenAI \"spinning up\" material and David Silver's lecture series. I've implemented DQL and a few deep policy gradient variants to solve several tasks, both standard Gym ones and hand-crafted. I have a high-level understanding of some of the more advanced stuff - TRPO, PPO, autocurricula, AlphaZero, constrained learning - but haven't worked through the math or implemented them",
    "amateur rocketry": "I recently worked with a team on an 8-month project in which we designed and built a 10+ ft. long rocket and UAV payload from scratch. I mainly worked on the UAV but tried to understand as much of the rocket design as possible. I have a good grasp of the avionics system and overall design considerations but need to learn more about things like fin design, flight simulation, and structural analysis",
    "uav design": "I spent the better part of a year designing, building, and programming a foldable quadcopter and am familiar with the required electronics and important design tradeoffs. Having worked only on one rather niche application, I have much more to learn about design considerations for other domains, alternative configurations (bicopter, fixed-wing, etc.), as well as things like control system optimization, sensor fusion, and advanced autonomous control",
    "linux os": "I've used a few different Linux flavors (mainly Ubuntu and Raspbian) both for personal computing and for embedded applications spanning at least 5 years. I'm familiar with the Linux filesystem, bash, headless use, and a smattering of specific features. I've mostly learned things as I've needed them so there are certainly large gaps in my Linux knowledge",
    "cad": "Most projects I work on involve at least some hardware component so I've gradually improved my CAD ability over the last several years. I've mostly used Fusion 360 and OnShape but could probably pick up any other CAD software pretty quickly. Typically I'm only designing a single part or a relatively simple assembly so while I'm good with the basics, there are a lot of features I don't have experience with",

    "graphic design": "I've been learning Adobe Illustrator to make vector graphics for this website. I'll likely keep needing more such graphics as I continue adding to the site so this is something I will definitely continue working at",
    "videography": "I'm planning to start making engineering YouTube videos in the very near future so I've been learning about the basics of lighting, recording, and video editing (Adobe Premiere)",
    "pcb design": "This is one of the clear next steps for taking my projects to the next level and generally improving my electrical engineering ability. I've started learning to use Autodesk Eagle and plan to start incorporating custom PCBs into future projects",
    "reverse engineering": "I've become fascinated with reverse engineering / hardware hacking after watching several lectures by penetration testers on YouTube. It seems like a great way to gain a deeper understanding of widely applicable engineering principles - reverse engineering the way specific devices or software work requires very diverse knowledge about how devices/software tend to work in general",
    "software-defined radio": "Radio is used across far more devices and domains than most people probably realize but it's easy to ignore or take for granted. I've become increasingly aware of this recently and have started learning more about how different radio devices work. I bought an SDR receiver and have started learning how to use GNU-radio to decode various signals."
};


$(document).ready(function(){

    // Display skill section info on hover
    $(".skills-section-svg, .skills-section-header-label, .skills-section-header-info").hover(function() {
        $(this).parent().find(".skills-section-header-info").css("visibility", "visible");
      }, function(){
        $(this).parent().find(".skills-section-header-info").css("visibility", "hidden");
    });

    // Open or close skill blurb when skill is clicked
    $(".skills-section-item").click(function() {

        // Get name of selected skill
        selected = $(this).text().toLowerCase();

        // Bold selected item and un-bold others
        $(this).css("font-weight", "bold");

        // Update blurb text
        $("#skills-section-blurb-text").text(skills_blurbs[selected]);
        $("#skills-section-blurb-title").text($(this).text());

        // Display blurb popup
        $("#skills-section-blurb-background").css("display", "flex");

    });

    $("#skills-section-blurb-close").click(function() {

        // Unbold all skills, clear blurb text
        $(".skills-section-item").css("font-weight", "normal");
        $("#skills-section-blurb-text").text("");

        // Close the popup
        $("#skills-section-blurb-background").css("display", "none");

    });

    // Skills section view for narrow displays
    var active_skill = 0
    update_table_view(active_skill);

    // Update table view whenever we resize
    $(window).resize(function() {
        update_table_view(active_skill);
    });

    // Increment/decrement active skill when arrows clicked
    $(".skills-arrow-left").click(function() {
        active_skill = (active_skill + 3) % 4;
        refresh_narrow_table(active_skill);
    });

    $(".skills-arrow-right").click(function() {
        active_skill = (active_skill + 1) % 4;
        refresh_narrow_table(active_skill);
    });

})


function update_table_view(active_col) {

    // Switch to narrow view
    if ($(window).width() < 900) {
        refresh_narrow_table(active_col);
    }

    // Switch to wide view
    else {
         $(".skills-col-0, .skills-col-1, .skills-col-2, .skills-col-3").css("display", "table-cell");
    }

}


function refresh_narrow_table(active_col) {

    // Hide all columns
    $(".skills-col-0, .skills-col-1, .skills-col-2, .skills-col-3").css("display", "none");

    // Show active column
    var tag = ".skills-col-" + active_col;
    $(tag).css("display", "table-cell");

}


