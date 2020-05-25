var file_service = require('../services/file.service');

class FileController{
    constructor() {
    }

    /*
    Handles the upload_file request
    :param req: the request
    :param res: the response
     */
    //TODO: Manejar excepciones y errores
    upload_file = (req, res) => {
        file_service.upload_file(res)
    }
}

module.exports = new FileController();