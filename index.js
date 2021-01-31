// globals
const BASEURL = 'http://127.0.0.1:3000';
const CONTENT = document.getElementById('content');
const INTERVALS = ["", "1", "b2", "2", "b3", "3", "b4", "4", "b5", "5", "b6", "6", "b7", "7"]
const MODIFIERS = ["", "maj", "min", "maj7", "min7", "maj9", "min9", "dim"]

// Navbar
const composerNav = document.getElementById('composers-nav');
const songsNav = document.getElementById('songs-nav');

composerNav.addEventListener('click', () => fetchComposers());
songsNav.addEventListener('click', () => fetchSongs());

// When DOMContent loaded
fetchComposers()

// Fill content with list of composers
function fetchComposers() {
    CONTENT.innerHTML = '';
    const composersWrapper = document.createElement('div');
    composersWrapper.id += 'composers-wrapper';
    CONTENT.appendChild(composersWrapper);

    fetch(`${BASEURL}/composers`)
        .then(resp => resp.json())
        .then(composers => {
            composers.forEach(composer => {
               const c = Composer.newFromObj(composer);
               c.renderComposer();
            })
        })
        .then( () => Composer.newComposerButton() )
}

// Fill content with list of songs
function fetchSongs() {
    CONTENT.innerHTML = '';
    const songsWrapper = document.createElement('div');
    songsWrapper.id += 'songs-wrapper';
    CONTENT.appendChild(songsWrapper);
    fetch(`${BASEURL}/songs`)
        .then(resp => resp.json())
        .then(songs => {
            songs.forEach(song => {
                const s = Song.newFromObj(song);
                s.renderSong();
            })
        })
}
