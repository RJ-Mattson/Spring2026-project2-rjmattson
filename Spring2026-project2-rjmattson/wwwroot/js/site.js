const apiKey = "f8d9983c308509bc2ce2ae985c842ca322a57ede";
let backgrounds = ["https://images.unsplash.com/photo-1520034475321-cbe63696469a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1501862700950-18382cd41497?q=80&w=1038&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://plus.unsplash.com/premium_photo-1721946441813-b39c511e8f92?q=80&w=1618&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
let currentBg = 0;

$(document).ready(function () {
    $("button").button();

    $("#query").addClass("ui-widget ui-widget-content ui-corner-all");

    $("#time").dialog({
        autoOpen: false,
        modal: true,
        show: { effect: "blind", duration: 500 }
    });

    $("#Search").click(function () {
        theSearch(false);
    });

    $("#gambleBtn").click(function () {
        theSearch(true);
    });

    $("#timeBtn").click(function () {
        const now = new Date();
        const formattedTime = now.toTimeString().slice(0, 5);
        $("#time").text(formattedTime).dialog("open");
    });

    $("#engineTitle").click(function () {
        currentBg = (currentBg + 1) % backgrounds.length;
        $("body").css({
            "background-image": `url('${backgrounds[currentBg]}')`,
            "background-size": "cover"
        });

    });
});

function theSearch(lucky) {

}
