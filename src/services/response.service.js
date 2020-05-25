class ResponseService {
    constructor() {

        //TODO: Que devuelva tambien el url
        this.success = (res, next, metadata) => {
            res.status(200);
            res.json(metadata);
            //next();
        };
    }
}

module.exports = new ResponseService();