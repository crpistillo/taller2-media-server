var fileService = require('../services/file.service');
var responseService = require('../services/response.service');

class FileController{
    constructor() {

        /*
        Handles the uploadFile request
        :param req: the request
        :param res: the response
         */
        //TODO: Manejar excepciones y errores

        //TODO: Cambiar para mandar los datos url de donde se ve el archivo
        this.uploadFile = (req, res, next) => {
            fileService.uploadFile(req.body.file)
                .then((metadata) => responseService.success(res, next, metadata))
                .catch(() => console.log('Error ocurred'));
        }
    }

}

module.exports = new FileController();