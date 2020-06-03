var fileService = require('../services/file.service');
var responseService = require('../services/response.service');
var formidable = require('formidable');
//util = require('util');

const MANDATORY_FILE = 'file';
const MANDATORY_FIELDS = ['email', 'title'];

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
            return req.headers['content-type'].startsWith('multipart/form-data')
        }

        this.deleteVideo = (req, res) => {

            if(!isMultipart(req))
                responseService.notMultipart(res);

            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                if (err) {
                    console.error(err.message);
                }
                //res.end(util.inspect({fields: fields, files: files}));
                if(!hasAllDeleteFields(fields))
                    responseService.missingField(res);

                fileService.deleteVideo(fields)
                    .then(() => responseService.successOnDelete(res, fields['title']))
                    .catch(() => responseService.deleteError(res));

            });
        }

        function hasAllDeleteFields(fields){
            return MANDATORY_FIELDS.every(item => fields.hasOwnProperty(item));
        }


    }
}

module.exports = new FileController();