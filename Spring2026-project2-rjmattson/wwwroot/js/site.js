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
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
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
    let query = $("#query").val();
    if (!query) return;
    const url = `https://google.serper.dev/search?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            if (lucky && data.organic && data.organic.length > 0) {
                window.location.href = data.organic[0].link;
                return;
            }
            const resultsDiv = $("#searchResults");
            resultsDiv.css("visibility", "visible").empty();
            
            if (data.knowledgeGraph) {
                resultsDiv.append(`
                    <div>Knowledge Graph</div>
                    <div style="margin-bottom:20px; padding:10px; border:1px solid #555;">
                        <strong>${data.knowledgeGraph.title || ''}</strong><br>
                        <small>${data.knowledgeGraph.type || ''}</small>
                        <p>${data.knowledgeGraph.description || ''}</p>
                    </div>
                `);
            }
            resultsDiv.append(`<div>Organic Results</div>`);
            if (data.organic && data.organic.length > 0) {
                data.organic.forEach(result => {
                    resultsDiv.append(`
                        <div class="result-item" style="margin-bottom:15px;">
                            <a href="${result.link}" target="_blank" style="color: #4db8ff; font-size: 18px; text-decoration: none;">${result.title}</a>
                            <p style="margin: 5px 0; color: #ccc;">${result.snippet}</p>
                        </div>
                    `);
                });
            }
            if (data.peopleAlsoAsk && data.peopleAlsoAsk.length > 0) {
                resultsDiv.append(`<div>People Also Ask</div>`);
                data.peopleAlsoAsk.forEach(item => {
                    resultsDiv.append(`<p style="color:#f39c12;">• ${item.question}</p>`);
                });
            }
            if (data.relatedSearches && data.relatedSearches.length > 0) {
                resultsDiv.append(`<div>Related Searches</div>`);
                const relatedStrings = data.relatedSearches.map(r => r.query).join(", ");
                resultsDiv.append(`<p style="font-style: italic; color: #bdc3c7;">${relatedStrings}</p>`);
            }
        }
    });
}
