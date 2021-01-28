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
        const measureDiv = document.createElement('div');
        const firstHalfDiv = document.createElement('div');
        const secondHalfDiv = document.createElement('div');
        measureDiv.appendChild(firstHalfDiv)
        measureDiv.appendChild(secondHalfDiv) 
        firstHalfDiv.innerHTML = this.selectsFromHalfMeasure(measure["firstHalf"])
        secondHalfDiv.innerHTML = this.selectsFromHalfMeasure(measure["secondHalf"])
        const measuresContainer = document.getElementById('measures-container')
        measuresContainer.appendChild(measure)      
    }

    selectsFromHalfMeasure(halfMeasure) {
        const intervalSelect = document.createElement('select')
        intervalSelect.value = halfMeasure["interval"]
        const modifierSelect = document.createElement('select')
        modifierSelect.value = halfMeasure["modifier"]
        // THESE ARE NOT GETTING ATTATCHED TO ANYTHING BECAUSE THE SELECT NEVER GETS APPENDED
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

// const firstDiv = document.createElement('div')
//             const secondDiv = document.createElement('div')
//             div.appendChild(firstDiv)
//             div.appendChild(secondDiv)
//             firstDiv.innerHTML += `${measure["firstHalf"]["interval"]}`
//             firstDiv.innerHTML += `${measure["firstHalf"]["modifier"]}`;
//             secondDiv.innerText += `${measure["secondHalf"]["interval"]}${measure["secondHalf"]["modifier"]}`;