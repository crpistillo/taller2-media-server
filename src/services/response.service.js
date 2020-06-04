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

        this.deleteError = (res, message) => {
            res.status(400);
            res.send(util.format(messages.ERROR_JSON, message))
        }

        this.successOnGetVideosByUser = (res, videos, user) => {
            res.status(200);
            res.send(util.format(messages.USER_VIDEO_LIST, user, JSON.stringify(videos)));

        }

        this.getVideosByUserError = (res) => {
            res.status(400);
            res.send(util.format(messages.ERROR_JSON, messages.USER_HAS_NO_VIDEOS));
        }

    }
}

module.exports = new ResponseService();