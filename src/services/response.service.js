var messages = require('../constants/messages');
var util = require('util');

class ResponseService {
    constructor() {

        this.successOnUpload = (res, metadata) => {
            res.status(200);
            res.json(metadata);
        };

        this.notMultipart = (res) => {
            res.status(400);
            res.send(util.format(messages.ERROR_JSON, messages.REQUEST_IS_NOT_MULTIPART));
        }

        this.missingField = (res) => {
            res.status(400);
            res.send(util.format(messages.ERROR_JSON, messages.MISSING_FIELDS_ERROR));
        }

        this.uploadError = (res, message) => {
            res.status(400);
            res.send(util.format(messages.ERROR_JSON, util.format(messages.ERROR_UPLOADING, message)));
        }

        this.successOnDelete = (res, fileName) => {
            res.status(200);
            res.send(util.format(messages.SUCCESS_JSON, util.format(messages.SUCCESS_ON_DELETE, fileName)))
        }

        this.deleteError = (res) => {
            res.status(400);
            res.send(util.format(messages.ERROR_JSON, messages.NON_EXISTING_FILE_ERROR))
        }

    }
}

module.exports = new ResponseService();