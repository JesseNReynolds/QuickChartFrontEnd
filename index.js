// globals
const BASEURL = 'http://127.0.0.1:3000';
const CONTENT = document.getElementById('content');

// Navbar
const composerNav = document.getElementById('composers-nav');
const songsNav = document.getElementById('songs-nav');

composerNav.addEventListener('click', () => fetchComposers());
songsNav.addEventListener('click', () => fetchSongs());

// Fill content with list of composers
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

// Fill content with list of songs
function fetchSongs() {
    CONTENT.innerHTML = '';
    fetch(`${BASEURL}/songs`)
        .then(resp => resp.json())
        .then(songs => {
            songs.forEach(song => {
                console.log(song);
                // console.log(JSON.parse(song["properties"]));
                debugger
                const s = Song.newFromObj(song);
                console.log(s)
            //    s.renderSong();
            })
        })
}

// When DOMContent loaded
fetchComposers()