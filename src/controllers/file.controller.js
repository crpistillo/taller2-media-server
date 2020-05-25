var file_service = require('../services/file.service');
var response_service = require('../services/response.service');

class FileController{
    constructor() {

        /*
        Handles the upload_file request
        :param req: the request
        :param res: the response
         */
        //TODO: Manejar excepciones y errores

        //TODO: Cambiar para mandar los datos url de donde se ve el archivo
        this.upload_file = (req, res, next) => {
            file_service.upload_file(req.body.file)
                .then(() => response_service.success(req, res, next))
                .catch(() => console.log('Error ocurred'));
        }
    }

}

module.exports = new FileController();