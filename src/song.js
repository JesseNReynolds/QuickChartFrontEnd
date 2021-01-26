class Song{

    constructor(id, name, object_notation) {
        this.id = id;
        this.name = name;
        this.tonic = object_notation["tonic"];
        this.mode = object_notation["mode"];
        this.timeSignature = object_notation["timeSignature"];
        this.measures = object_notation["measures"];
    }

    static newFromObj(obj) {
        const s = new Song(obj.id, obj.name, obj.object_notation);
        return s;
    }
}