var fileService = require('../services/file.service');
var responseService = require('../services/response.service');
var formidable = require('formidable');
var requestController = require('../controllers/request.controller')
//util = require('util');

class FileController{
    constructor() {
        /*
        Handles the uploadVideo request
        :param req: the multipart/form-data request
        :param res: the response
         */
        this.uploadVideo = (req, res) => {
            if(!requestController.isMultipart(req))
                responseService.notMultipart(res);

            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                if (err) {
                    console.error(err.message);
                }
                //res.end(util.inspect({fields: fields, files: files}));
                if(!requestController.hasAllUploadFields(files, fields))
                    responseService.missingField(res);

                fileService.uploadVideo(files['file'], fields)
                    .then((metadata) => responseService.successOnUpload(res, metadata))
                    .catch((message) => responseService.uploadError(res, message));
            });
        }

        /*
        Handles the deleteVideo request
        :param req: the request
        :param res: the response
         */
        this.deleteVideo = (req, res) => {

            if(!requestController.hasAllDeleteFields(req.query))
                responseService.missingField(res);

            fileService.deleteVideo(req.query)
                .then(() => responseService.successOnDelete(res, req.query.title))
                .catch(() => responseService.deleteError(res, message));

        }

        /*
        Handles the videosByUser request
        :param req: the request
        :param res: the response
         */
        this.getVideosByUser= (req, res) => {
            if(!requestController.hasAllGetVideosByUserFields(req.query))
                responseService.missingField(res);

            fileService.getVideosByUser(req.query.email)
                .then((videos) => responseService.successOnGetVideosByUser(res, videos, req.query.email))
                .catch(() => responseService.getVideosByUserError(res));
        }
    }
}

module.exports = new FileController();