class ResponseService {
    constructor() {

        //TODO: Que devuelva el tamaño y la fecha en la metadata. Tambien url
        this.success = (req, res, next) => {
            var data = {};
            //data["metadata"] =
            data['file'] = req.body.file;
            res.status(200);
            res.json(data);
            //next();
        };
    }
}

module.exports = new ResponseService();