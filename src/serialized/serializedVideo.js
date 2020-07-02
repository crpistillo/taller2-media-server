class serializedVideo {
    /**
     * Ceates a serialized metadata with a file name, size and updated date
     * @param{string} name - the file name
     */

    constructor(name) {
        this.name = name;
    }
}

module.exports = serializedVideo;