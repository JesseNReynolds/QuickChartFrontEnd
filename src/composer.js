class Composer{

    constructor(name, id){
        this.id = id;
        this.name = name;
    }

    static newFromObj(obj) {
        const c = new Composer(obj.name, obj.id);
        return c;
    }

    showComposer() {
        CONTENT.innerHTML = '';
        const composerContainer = document.createElement('div');
        composerContainer.innerHTML += `<h2>${this.name}</h2>`;
        CONTENT.appendChild(composerContainer);

        const songsWrapper = document.createElement('div');
        songsWrapper.id += 'songs-wrapper';
        CONTENT.appendChild(songsWrapper);

        fetch(`${BASEURL}/composers/${this.id}/songs`)
            .then(resp => resp.json())
            .then(songs => {
                songs.forEach(song => {
                    const s = Song.newFromObj(song);
                    s.renderSong();
                })
            })
            
        const newSongButton = document.createElement('button')
        newSongButton.id = 'new-song-button'
        newSongButton.innerText = "New Song"
        newSongButton.classList += 'grey-button'
        CONTENT.appendChild(newSongButton)
        newSongButton.addEventListener('click', () => Song.newSongButton(this), {once: true})
    }

    renderComposer() {
        const composersWrapper = document.getElementById('composers-wrapper')
        const composerContainer = document.createElement('div');
        composersWrapper.appendChild(composerContainer);

        composerContainer.innerHTML = `<h3>${this.name}</h3>`;
        composerContainer.id += `${this.id}`;
        composerContainer.className += 'composer';
        composerContainer.addEventListener('click', () => this.showComposer());
    }

    static newComposerButton() {
        const newComposerButton = document.createElement('button')
        newComposerButton.classList += 'grey-button'
        newComposerButton.id = 'new-composer-button'
        newComposerButton.innerText = "Add a New Composer"
        CONTENT.appendChild(newComposerButton)
        newComposerButton.addEventListener('click', Composer.createNewComposerForm, {once: true})
    }
    
    static createNewComposerForm() {
        const newComposerButton = document.getElementById('new-composer-button')
        newComposerButton.innerText = "Submit New Composer"
        newComposerButton.addEventListener('click', Composer.persistNewComposer, {once: true})
        const nameField = document.createElement('input')
        const label = document.createElement('label')
        label.innerText = "Name: "
        nameField.id = 'composer-name-field'
        CONTENT.insertBefore(label, newComposerButton)
        CONTENT.insertBefore(nameField, newComposerButton)
    }
    
    static persistNewComposer() {
        const nameField = document.getElementById('composer-name-field')
        const composer = new Composer(nameField.value)
        fetch(`${BASEURL}/composers`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(composer),
        })
        .then(() => fetchComposers())
    }
    
}