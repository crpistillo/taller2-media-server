var fileService = require('../services/file.service');
var responseService = require('../services/response.service');
var formidable = require('formidable');
//util = require('util');

const MANDATORY_FILE = 'file';
const MANDATORY_FIELDS = ['email', 'title'];
const MANDATORY_FIELDS_VIDEOS_PER_USER = 'email';

class FileController{
    constructor() {
        /*
        Handles the uploadVideo request
        :param file: the file object of the video to upload
        :param res: the response
         */
        //TODO: Manejar excepciones y errores

        this.uploadVideo = (req, res) => {
            if(!isMultipart(req))
                responseService.notMultipart(res);

            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                if (err) {
                    console.error(err.message);
                }
                //res.end(util.inspect({fields: fields, files: files}));
                if(!hasAllUploadFields(files, fields))
                    responseService.missingField(res);

                fileService.uploadVideo(files['file'], fields)
                    .then((metadata) => responseService.successOnUpload(res, metadata))
                    .catch((message) => responseService.uploadError(res, message));

            });
        }

        function hasAllUploadFields(files, fields) {
            return (MANDATORY_FILE in files && MANDATORY_FIELDS.every(item => fields.hasOwnProperty(item)));
        }

        function isMultipart(req) {
            return req.headers['content-type'].startsWith('multipart/form-data');
        }

        function isJson(req){
            return req.headers['content-type'].startsWith('application/json');
        }

        this.deleteVideo = (req, res) => {

            if(!hasAllDeleteFields(req.query))
                responseService.missingField(res);

            fileService.deleteVideo(req.query)
                .then(() => responseService.successOnDelete(res, req.query.title))
                .catch(() => responseService.deleteError(res));

        }

        function hasAllDeleteFields(query){
            return MANDATORY_FIELDS.every(item => query.hasOwnProperty(item));
        }

        this.getVideosByUser= (req, res) => {
            if(!hasAllGetVideosPerUserFields(req.query))
                responseService.missingField(res);

            fileService.getVideosByUser(req.query.email)
                .then((videos) => responseService.successOnGetVideosByUser(res, videos, req.query.email))
                .catch(() => responseService.getVideosByUserError(res));
        }

        function hasAllGetVideosPerUserFields(query){
            return MANDATORY_FIELDS_VIDEOS_PER_USER in query;
        }


    }
}

module.exports = new FileController();