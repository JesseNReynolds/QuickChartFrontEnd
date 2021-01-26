// globals
const BASEURL = 'http://127.0.0.1:3000';
const CONTENT = document.getElementById('content');

// Navbar
const composerNav = document.getElementById('composers-nav');
const songsNav = document.getElementById('songs-nav');

composerNav.addEventListener('click', () => fetchComposers());
songsNav.addEventListener('click', () => console.log('clicked songs'));

// Fill parent element with list of composers
function fetchComposers() {
    CONTENT.innerHTML = '';
    fetch(`${BASEURL}/composers`)
        .then(resp => resp.json())
        .then(composers => {
            composers.forEach(composer => {
               const c = Composer.newFromObj(composer);
               c.renderComposer();
            })
        })
}

// When DOMContent loaded
fetchComposers()