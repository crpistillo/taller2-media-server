class serializedFile {
    /**
     * Ceates a serialized file with a file name and path
     * @param{string} name - the file name
     * @param{string} path - the path of the file
     */

    constructor(name, path) {
        this.name = name;
        this.path = path;
    }
}

module.exports = serializedFile;

