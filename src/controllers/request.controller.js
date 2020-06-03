const MANDATORY_FILE = 'file';
const MANDATORY_FIELDS = ['email', 'title'];
const MANDATORY_FIELDS_VIDEOS_PER_USER = 'email';

class RequestController {
    constructor() {
        /*
        Checks if the uploadVideo-request has all the required fields
        :param files: contains all the file objects in the request
        :param fields: contains all the field objects in the request
        :return: true if the request has the MANDATORY_FILE and MANDATORY_FIELDS
         */
        this.hasAllUploadFields = (files, fields) => {
            return (MANDATORY_FILE in files && MANDATORY_FIELDS.every(item => fields.hasOwnProperty(item)));
        }

        /*
        Checks if the request is multipart/form-data
        :param req: the request
        :return: true if the request is multipart/form-data
         */
        this.isMultipart = (req) => {
            return req.headers['content-type'].startsWith('multipart/form-data');
        }

        /*
        Checks if the query of the deleteVideo-request has all the required fields
        :param query: the query of the delete-request
        :return: true if the query has all MANDATORY_FIELDS
         */
        this.hasAllDeleteFields = (query) => {
            return MANDATORY_FIELDS.every(item => query.hasOwnProperty(item));
        }

        /*
        Checks if the query of the videosByUser-request hass all the required fields
        :param query: the query of the get-request
        :return: true if the query has all MANDATORY_FIELDS_VIDEOS_PER_USER
         */
        this.hasAllGetVideosByUserFields= (query) => {
            return MANDATORY_FIELDS_VIDEOS_PER_USER in query;
        }

    }
}
module.exports = new RequestController();