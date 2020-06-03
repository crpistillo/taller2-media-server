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
            if(!req.headers['content-type'].startsWith('multipart/form-data'))
                responseService.notMultipart(res);

            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                if (err) {
                    console.error(err.message);
                }
                //res.end(util.inspect({fields: fields, files: files}));
                if(!hasAllFields(files, fields))
                    responseService.missingField(res);

                fileService.uploadVideo(files['file'], fields)
                    .then((metadata) => responseService.success(res, metadata))
                    .catch((message) => responseService.uploadError(res, message));

            });
        }

        function hasAllFields(files, fields) {
            return (MANDATORY_FILE in files && MANDATORY_FIELDS.every(item => fields.hasOwnProperty(item)));
        }


    }
}

module.exports = new FileController();