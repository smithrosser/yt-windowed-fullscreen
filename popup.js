document.addEventListener('DOMContentLoaded', () => {

    const label = document.getElementById('label');
    const status = document.getElementById('status');
    const toggle = document.getElementById('toggle');

    // get currently opened
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
        let url = tabs[0].url;

        let matchWatch = url.match(/.*watch\?.*v=([^=&]*).*/);
        let matchEmbed = url.match(/.*embed\/\.*([^=&]*).*/);

        if (matchWatch) {
            toggle.className = 'button_enabled';
            toggle.addEventListener('click', () => {
                chrome.tabs.update(tabs[0].id, { url: 'https://www.youtube.com/embed/' + matchWatch[1] });
                window.close();
            });
        }
        else if (matchEmbed) {
            toggle.className = 'button_enabled';
            toggle.addEventListener('click', () => {
                chrome.tabs.update(tabs[0].id, { url: 'https://www.youtube.com/watch?v=' + matchEmbed[1] });
                window.close();
            });
        }
        else {
            toggle.className = 'button_disabled';
            toggle.innerHTML = "(probably) invalid url";
        }

    });
});
