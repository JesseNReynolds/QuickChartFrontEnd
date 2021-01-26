class Composer{

    constructor(id, name){
        this.id = id
        this.name = name
    }

    static newFromObj(obj) {
        const c = new Composer(obj.id, obj.name)
        return c
    }

    renderComposer() {
        let composerContainer = document.createElement('div');
        composerContainer.innerText = `${this.name}`;
        composerContainer.id += `${this.id}`;
        composerContainer.className += 'composer';
        console.log(composerContainer);
        CONTENT.appendChild(composerContainer);
    }

}