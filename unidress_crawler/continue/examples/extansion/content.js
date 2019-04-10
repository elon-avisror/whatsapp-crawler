// center tab
alert("Hello from your Chrome extension!");

// first console.log
var firstHref = $("a[href^='http']").eq(0).attr("href");
console.log(firstHref);

// wait for backgroung.js trigger
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            var firstHref = $("a[href^='http']").eq(0).attr("href");
            console.log(firstHref);

            // this line is new!
            chrome.runtime.sendMessage({
                "message": "open_new_tab",
                "url": firstHref
            });
        }
    }
);