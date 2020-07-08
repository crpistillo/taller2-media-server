var messages = require('../constants/messages');
var util = require('util');
const logger = require('../services/logger');

class ResponseService {
    constructor() {

        this.successOnUpload = (res, metadata, fileName) => {
            logger.debug(util.format(messages.SUCCESS_ON_UPLOAD, fileName))
            res.status(200)
            res.json(metadata);
        };

        this.notMultipart = (res) => {
            logger.debug(messages.REQUEST_IS_NOT_MULTIPART);
            res.status(400).send(util.format(messages.ERROR_JSON, messages.REQUEST_IS_NOT_MULTIPART));
        }

        this.missingField = (res) => {
            logger.debug(messages.MISSING_FIELDS_ERROR);
            res.status(400).send(util.format(messages.ERROR_JSON, messages.MISSING_FIELDS_ERROR));
        }

        this.uploadError = (res, message) => {
            logger.debug(util.format(messages.ERROR_UPLOADING, message));
            res.status(400).send(util.format(messages.ERROR_JSON, util.format(messages.ERROR_UPLOADING, message)));
        }

        this.successOnDelete = (res, fileName) => {
            logger.debug(util.format(messages.SUCCESS_ON_DELETE, fileName));
            res.status(200).send(util.format(messages.SUCCESS_JSON, util.format(messages.SUCCESS_ON_DELETE, fileName)))
        }

        this.deleteError = (res, message) => {
            logger.debug(message);
            res.status(400).send(util.format(messages.ERROR_JSON, message))
        }

        this.successOnGetVideosByUser = (res, videos, user) => {
            res.status(200).send(util.format(messages.USER_VIDEO_LIST, user, JSON.stringify(videos)));

        }

        this.getVideosByUserError = (res) => {
            logger.debug(messages.USER_HAS_NO_VIDEOS);
            res.status(400).send(util.format(messages.ERROR_JSON, messages.USER_HAS_NO_VIDEOS));
        }
    }
}

module.exports = new ResponseService();