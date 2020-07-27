const fs = require('../services/file.service');
const fileService = new fs();
var responseService = require('../services/response.service');
var formidable = require('formidable');
var requestController = require('../controllers/request.controller')
util = require('util');
const logger = require('../services/logger');
const messages = require('../constants/messages');

class FileController{
    constructor() {
        /**
         * Handles the uploadVideo request
         * @param{express.Request} req - the multipart/form-data request
         * @param{express.Response} res - the response
         */
        this.uploadVideo = (req, res) => {
            if(!requestController.isMultipart(req))
                responseService.notMultipart(res);

            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                if (err) {
                    logger.error(err.message);
                }
                //res.end(util.inspect({fields: fields, files: files}));
                if(!requestController.hasAllUploadFields(files, fields))
                    responseService.missingField(res);

                else if(!requestController.validFile(files['file'].name))
                    responseService.invalidFileName(res);

                else{
                    logger.debug(util.format(messages.UPLOADING_VIDEO, fields['title'], fields['email']));
                    fileService.uploadVideo(files['file'], fields)
                        .then((metadata) => responseService.successOnUpload(res, metadata, fields))
                        .catch((message) => responseService.uploadError(res, message));
                }
            });
        }

        /**
         * Handles the deleteVideo request
         * @param{express.Request} req - the request
         * @param{express.Response} res - the response
         */
        this.deleteVideo = (req, res) => {

            if(!requestController.hasAllDeleteFields(req.query))
                responseService.missingField(res);

            else {
                logger.debug(util.format(messages.DELETING_VIDEO, req.query.title, req.query.email))
                fileService.deleteVideo(req.query)
                    .then(() => responseService.successOnDelete(res, req.query))
                    .catch((message) => responseService.deleteError(res, message));
            }
        }

        /**
         * Handles the videosByUser request
         * @param{express.Request} req - the request
         * @param{express.Response} res - the response
         */
        this.getVideosByUser = (req, res) => {
            if(!requestController.hasAllGetVideosByUserFields(req.query))
                responseService.missingField(res);

            fileService.getVideosByUser(req.query.email)
                .then((videos) => responseService.successOnGetVideosByUser(res, videos, req.query.email))
                .catch(() => responseService.getVideosByUserError(res));
        }
    }
}

module.exports = FileController;