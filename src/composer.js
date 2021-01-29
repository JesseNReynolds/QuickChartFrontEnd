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
        composerContainer.innerHTML += `${this.name}`;
        fetch(`${BASEURL}/composers/${this.id}/songs`)
            .then(resp => resp.json())
            .then(songs => {
                songs.forEach(song => {
                    const s = Song.newFromObj(song);
                    s.renderSong();
                })
            })
        CONTENT.appendChild(composerContainer);
    }

    renderComposer() {
        const composersWrapper = document.getElementById('composers-wrapper')
        const composerContainer = document.createElement('div');
        composerContainer.innerHTML = `<h3>${this.name}</h3>`;
        composerContainer.id += `${this.id}`;
        composerContainer.className += 'composer';
        composersWrapper.appendChild(composerContainer);

        composerContainer.addEventListener('click', () => this.showComposer());
    }

}