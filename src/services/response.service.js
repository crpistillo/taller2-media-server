const messages = require('../constants/messages');
const util = require('util');
const logger = require('../services/logger');

class ResponseService {
    constructor() {

        this.successOnUpload = (res, metadata, fields) => {
            logger.debug(util.format(messages.SUCCESS_ON_UPLOAD, fields['title'], fields['email']))
            res.status(201)
            res.json(metadata);
        };

        this.notMultipart = (res) => {
            logger.error(messages.REQUEST_IS_NOT_MULTIPART);
            res.status(400).send(util.format(messages.ERROR_JSON, messages.REQUEST_IS_NOT_MULTIPART));
        }

        this.missingField = (res) => {
            logger.error(messages.MISSING_FIELDS_ERROR);
            res.status(400).send(util.format(messages.ERROR_JSON, messages.MISSING_FIELDS_ERROR));
        }

        this.invalidFileName = (res) => {
            logger.error(messages.INVALID_FILE_NAME_OR_EXTENSION);
            res.status(400).send(util.format(messages.ERROR_JSON, messages.INVALID_FILE_NAME_OR_EXTENSION));
        }

        this.uploadError = (res, error) => {
            logger.error(util.format(messages.ERROR_UPLOADING, error.message));
            res.status(400).send(util.format(messages.ERROR_JSON, util.format(messages.ERROR_UPLOADING, error.message)));
        }

        this.successOnDelete = (res, query) => {
            logger.debug(util.format(messages.SUCCESS_ON_DELETE, query.title, query.email))
            res.status(200).send(util.format(messages.SUCCESS_JSON,
                util.format(messages.SUCCESS_ON_DELETE, query.title, query.email)));
        }

        this.deleteError = (res, message) => {
            logger.error(util.format(messages.ERROR_DELETING, message));
            res.status(404).send(util.format(messages.ERROR_JSON, util.format(messages.ERROR_DELETING, message)));
        }

        this.successOnGetVideosByUser = (res, videos, user) => {
            logger.debug(util.format(messages.SUCCESS_ON_GET, user));
            res.status(200).send({user: user, videos: videos});
        }

        this.nonExistingUserOrVideosError = (res, user) => {
            logger.error(util.format(messages.USER_HAS_NO_VIDEOS, user))
            res.status(404).send(util.format(messages.ERROR_JSON,util.format(messages.USER_HAS_NO_VIDEOS, user)));
        }

        this.getVideosByUserError = (res, message) => {
            logger.error(message);
            res.status(404).send({ status: 'Error', message: message});
        }
    }
}

module.exports = new ResponseService();