class Song{

    constructor(id, name, properties) {
        this.id = id;
        this.name = name;
        this.tonic = properties["tonic"];
        this.mode = properties["mode"];
        this.timeSignature = properties["timeSignature"];
        this.measures = properties["measures"];
    }

    static newFromObj(obj) {
        const s = new Song(obj.id, obj.name, JSON.parse(obj.properties));
        return s;
    }

    renderSong() {
        const songContainer = document.createElement('div');
        songContainer.innerText = `${this.name}`;
        songContainer.id += `${this.id}`;
        songContainer.className += 'song';
        CONTENT.appendChild(songContainer);
        songContainer.addEventListener('click', () => this.showSong());
    }

    showSong() {
        console.log('test')
        CONTENT.innerHTML = ''
        const showSongContainer = document.createElement('div');
        showSongContainer.innerHTML = 
        `${this.name} <br>
        ${this.tonic} <br>
        ${this.mode} <br>
        ${this.timeSignature} <br>
        `;
        // console.log(this.measures)
        showSongContainer.id += `${this.id}`;
        showSongContainer.className += 'song';
        CONTENT.appendChild(showSongContainer);
    }

}