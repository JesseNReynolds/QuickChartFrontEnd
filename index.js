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
    fetch(`${BASEURL}/composers`)
        .then(resp => resp.json())
        .then(composers => {
            composers.forEach(composer => {
               const c = Composer.newFromObj(composer);
               c.renderComposer();
            })
        })
        .then( () => newComposerButton() )


}

// Fill content with list of songs
function fetchSongs() {
    CONTENT.innerHTML = '';
    fetch(`${BASEURL}/songs`)
        .then(resp => resp.json())
        .then(songs => {
            songs.forEach(song => {
                const s = Song.newFromObj(song);
                s.renderSong();
            })
        })
}

// add buttons to create form for new composer or song

function newComposerButton() {
    const newComposerButton = document.createElement('button')
    newComposerButton.id = 'new-composer-button'
    newComposerButton.innerText = "Add a New Composer"
    CONTENT.appendChild(newComposerButton)
    newComposerButton.addEventListener('click', () => createNewComposerForm(), {once: true})
}

function createNewComposerForm() {
    const newComposerButton = document.getElementById('new-composer-button')
    newComposerButton.innerText = "Submit New Composer"
    newComposerButton.addEventListener('click', console.log('test'), {once: true})
    const nameField = document.createElement('input')
    const label = document.createElement('label')
    label.innerText = "Name: "
    CONTENT.insertBefore(label, newComposerButton)
    CONTENT.insertBefore(nameField, newComposerButton)
    

}