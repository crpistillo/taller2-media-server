var messages = require('../constants/messages');
var util = require('util');

class ResponseService {
    constructor() {

        this.success = (res, metadata) => {
            res.status(200);
            res.json(metadata);
        };

        this.notMultipart = (res) =>
        {
            res.status(400);
            res.send(util.format(messages.ERROR_JSON, messages.REQUEST_IS_NOT_MULTIPART));
        }

        this.missingField = (res) =>
        {
            res.status(400);
            res.send(util.format(messages.ERROR_JSON, messages.MISSING_FIELDS_ERROR));
        }
    }
}

module.exports = new ResponseService();