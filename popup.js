document.addEventListener('DOMContentLoaded', function() {

    var label = document.getElementById('label');
    var status = document.getElementById('status');
    var toggle = document.getElementById('toggle');

    // get currently opened
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;

        let matches = url.match(/.*watch\?.*v=([^=&]*).*/);
        if (matches) {
            toggle.addEventListener('click', function() {
                chrome.tabs.update(tabs[0].id, { url: "https://www.youtube.com/embed/" + matches[1] });
            });
        }
        else {
            status.innerHTML = '(probably) invalid url';
        }

    });
});
