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
        const songsWrapper = document.getElementById('songs-wrapper')
        const songContainer = document.createElement('div');
        songContainer.innerHTML = `<h4>${this.name}</h4>`;
        songContainer.id += `${this.id}`;
        songContainer.className += 'song';
        songsWrapper.appendChild(songContainer);
        songContainer.addEventListener('click', () => this.showSong());
    }

    showSong() {
        CONTENT.innerHTML = ''
        const showSongContainer = document.createElement('div');
        showSongContainer.id += 'show-song-container'
        showSongContainer.innerHTML = 
        `<h2>${this.name}</h2>
        <p>Tonic: ${this.tonic}</p>
        <p>Mode: ${this.mode}</p>
        <p>Time signature: ${this.timeSignature}</p>
        `;
        CONTENT.appendChild(showSongContainer);
        this.measuresToDivs()
    }

    measuresToDivs(){
        const showSongContainer = document.getElementById('show-song-container')
        const measuresContainer = document.createElement('div');
        measuresContainer.id += 'measures-container'
        showSongContainer.appendChild(measuresContainer)        
        this.measures.forEach((measure) => {
        Song.measureWithHalfMeasureDivsWithSelects(measure)
        });
    }

    static measureWithHalfMeasureDivsWithSelects(measure, triggeringButton) {
        const measuresContainer = document.getElementById('measures-container');
        const measureDiv = document.createElement('div');
        const firstHalfDiv = document.createElement('div');
        const secondHalfDiv = document.createElement('div');
        measureDiv.classList += 'measure'
        
        if (!!triggeringButton) {
            const target = triggeringButton.parentElement.nextElementSibling
            measuresContainer.insertBefore(measureDiv, target);
        } else {
            measuresContainer.appendChild(measureDiv);
        }

        measureDiv.appendChild(firstHalfDiv)
        measureDiv.appendChild(secondHalfDiv)
        Song.buildSelectsFromHalfMeasure(measure["firstHalf"], firstHalfDiv)
        Song.buildSelectsFromHalfMeasure(measure["secondHalf"], secondHalfDiv)
        
        const addMeasureButton = document.createElement('button')
        addMeasureButton.innerText = "+"
        addMeasureButton.classList += 'add-measure-button'

        if (!!triggeringButton) {
            const target = measureDiv.nextElementSibling
            measureDiv.appendChild(addMeasureButton, target)
        } else {            
            measureDiv.appendChild(addMeasureButton)
        }

        measureDiv.addEventListener('click', (e) => Song.addMeasure(e.srcElement))

    }

    static buildSelectsFromHalfMeasure(halfMeasure, targetDiv) {
        const intervalSelect = document.createElement('select')
        targetDiv.appendChild(intervalSelect)

        const modifierSelect = document.createElement('select')
        targetDiv.appendChild(modifierSelect)

        INTERVALS.forEach(interval => {
            const option = document.createElement('option')
            option.text = interval
            intervalSelect.add(option)
        })

        MODIFIERS.forEach(modifier => {
            const option = document.createElement('option')
            option.text = modifier
            modifierSelect.add(option)
        })

        intervalSelect.value = halfMeasure["interval"]
        modifierSelect.value = halfMeasure["modifier"]

        intervalSelect.addEventListener('change', Song.addSaveButtonIfNonePresent)
        modifierSelect.addEventListener('change', Song.addSaveButtonIfNonePresent)
    }

    static addMeasure(srcButton) {
        const configObj = {
            "firstHalf": {
                "interval": "",
                "modifier": ""
            },
            "secondHalf": {
                "interval": "",
                "modifier": ""
            }
        }
        Song.measureWithHalfMeasureDivsWithSelects(configObj, srcButton)
        Song.addSaveButtonIfNonePresent()
    }

    static addSaveButtonIfNonePresent() {
        const saveButton = document.getElementById('save-song-changes-button')

        if (!saveButton) {
            const button = document.createElement('button')
            button.id = 'save-song-changes-button'
            button.innerText = "Save Changes"
            CONTENT.appendChild(button)
            button.addEventListener('click', () => console.log('come back to build function!'), {once: true})
        }
    }
    
}
