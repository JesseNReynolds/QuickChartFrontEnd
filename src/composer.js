class Composer{

    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    static newFromObj(obj) {
        const c = new Composer(obj.id, obj.name);
        return c;
    }

    showComposer() {
        console.log(this)
        CONTENT.innerHTML = '';
        const composerContainer = document.createElement('div');
        composerContainer.innerHTML += `${this.name}`;
        // FUNCTION TO SHOW COMOPOSERS SONGS
        CONTENT.appendChild(composerContainer);
    }

    renderComposer() {
        const composerContainer = document.createElement('div');
        composerContainer.innerText = `${this.name}`;
        composerContainer.id += `${this.id}`;
        composerContainer.className += 'composer';
        CONTENT.appendChild(composerContainer);
        composerContainer.addEventListener('click', () => this.showComposer());
    }

}