var fileService = require('../services/file.service');
var responseService = require('../services/response.service');
var formidable = require('formidable');
//util = require('util');

const MANDATORY_FIELDS = 'file';

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
                if(!(MANDATORY_FIELDS in files))
                    responseService.missingField(res);

                fileService.uploadVideo(files['file'])
                    .then((metadata) => responseService.success(res, metadata))
                    .catch(() => console.log('Error ocurred'));

            });
        }
    }
}

module.exports = new FileController();