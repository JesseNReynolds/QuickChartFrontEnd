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
        CONTENT.innerHTML = ''
        const showSongContainer = document.createElement('div');
        showSongContainer.id += 'show-song-container'
        showSongContainer.innerHTML = 
        `${this.name} <br>
        Tonic: ${this.tonic} <br>
        Mode: ${this.mode} <br>
        Time signature: ${this.timeSignature} <br>
        `;
        showSongContainer.className += 'song';
        CONTENT.appendChild(showSongContainer);
        this.measuresToDivs()
    }

    measuresToDivs(){
        const showSongContainer = document.getElementById('show-song-container')
        const measuresContainer = document.createElement('div');
        measuresContainer.id += 'measures-container'
        showSongContainer.appendChild(measuresContainer)        
        this.measures.forEach(measure => {
        this.measureWithHalfMeasureDivsWithSelects(measure)
        });
    }

    measureWithHalfMeasureDivsWithSelects(measure) {
        const measuresContainer = document.getElementById('measures-container');
        const measureDiv = document.createElement('div');
        const firstHalfDiv = document.createElement('div');
        const secondHalfDiv = document.createElement('div');
        measureDiv.classList += 'measure'
        measuresContainer.appendChild(measureDiv);
        measureDiv.appendChild(firstHalfDiv)
        measureDiv.appendChild(secondHalfDiv) 
        this.selectsFromHalfMeasure(measure["firstHalf"], firstHalfDiv)
        this.selectsFromHalfMeasure(measure["secondHalf"], secondHalfDiv)
     
    }

    selectsFromHalfMeasure(halfMeasure, targetDiv) {
        const intervalSelect = document.createElement('select')
        console.log(halfMeasure["interval"])
        intervalSelect.value = halfMeasure["interval"]
        targetDiv.appendChild(intervalSelect)
        const modifierSelect = document.createElement('select')
        modifierSelect.value = halfMeasure["modifier"]
        targetDiv.appendChild(modifierSelect)
        INTERVALS.forEach(interval => {
            const option = document.createElement('option')
            console.log(option)
            option.text = interval
            intervalSelect.add(option)
        })
        MODIFIERS.forEach(modifier => {
            const option = document.createElement('option')
            option.text = modifier
            modifierSelect.add(option)
        })
    }
}
