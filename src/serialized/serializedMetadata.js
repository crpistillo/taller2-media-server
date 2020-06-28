class serializedMetadata {
    /**
     * Ceates a serialized metadata with a file name, size and updated date
     * @param{string} name - the file name
     * @param{string} size - the size of the file
     * @param{string} updated - the date the file was updated
     */

    constructor(name, size, updated) {
        this.name = name;
        this.path = size;
        this.updated = updated;
    }
}

module.exports = serializedMetadata;

