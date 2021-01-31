class Song{

    constructor(name, properties, composer_id, id) {
        this.id = id;
        this.name = name;
        this.composerID = composer_id
        this.tonic = properties["tonic"];
        this.mode = properties["mode"];
        this.timeSignature = properties["timeSignature"];
        this.measures = properties["measures"];
    }

    static newFromObj(obj) {
        const s = new Song(obj.name, obj.properties, obj.composer_id, obj.id);
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
        showSongContainer.innerHTML = `<h2>${this.name}</h2>`
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
        addMeasureButton.classList += 'grey-button add-measure-button'

        if (!!triggeringButton) {
            const target = measureDiv.nextElementSibling
            measureDiv.appendChild(addMeasureButton, target)
        } else {            
            measureDiv.appendChild(addMeasureButton)
        }

        addMeasureButton.addEventListener('click', (e) => Song.addMeasure(e.srcElement))

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
            button.classList += 'grey-button'
            button.innerText = "Save Changes"
            CONTENT.appendChild(button)
            button.addEventListener('click', () => console.log('come back to build function!'), {once: true})
        }
    }

    static newSongButton(composerObj) {
        const button = document.getElementById('new-song-button')
        button.innerText = "Create New Song"
        button.addEventListener('click', () => Song.newSongFromButton(composerObj), {once: true})
        
        const label = document.createElement('label')
        label.innerText = "Song Name: "
        CONTENT.insertBefore(label, button)

        const input = document.createElement('input')
        input.id = 'song-name-field'
        CONTENT.insertBefore(input, button)

    }

    static newSongFromButton(composerObj) {
        const configObj = {
            tonic: "",
            mode: "",
            timeSignature: "",
            measures: [ 
                {
                    firstHalf: {
                        interval: "",
                        modifier: ""
                    },
                    secondHalf: {
                        interval: "",
                        modifier: ""
                    }
                }
            ]
        }

        const nameField = document.getElementById('song-name-field')
        const song = new Song(nameField.value, configObj, composerObj.id)
        fetch(`${BASEURL}/songs`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: `{"name":"${song.name}","composer_id":${song.composerID},"properties":${JSON.stringify(configObj)}}`,
            })
            .then(resp => resp.json())
            .then(songObj => {
                const newSong = Song.newFromObj(songObj);
                newSong.showSong()
            })
        
    }


}
