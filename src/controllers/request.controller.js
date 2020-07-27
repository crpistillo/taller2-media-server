const MANDATORY_FILE = 'file';
const MANDATORY_FIELDS = ['email', 'title'];
const MANDATORY_FIELDS_VIDEOS_PER_USER = 'email';
const VALID_EXTENSION = '.mp4';

class RequestController {
    constructor() {
        /**
         * Checks if the uploadVideo-request has all the required fields
         * @param{formidable.files} files - contains all the file objects in the request
         * @param{formidable.fields} fields - contains all the field objects in the request
         * @return{Boolean} - true if the request has the MANDATORY_FILE and MANDATORY_FIELDS
         */
        this.hasAllUploadFields = (files, fields) => {
            return (MANDATORY_FILE in files && MANDATORY_FIELDS.every(item => fields.hasOwnProperty(item)));
        }

        /**
         * Checks if the request is multipart/form-data
         * @param{express.request} req - the request
         * @return{Boolean} true if the request is multipart/form-data
         */
        this.isMultipart = (req) => {
            return req.headers['content-type'].startsWith('multipart/form-data');
        }

        /**
         * Checks if the query of the deleteVideo-request has all the required fields
         * @param{express.Request.query} query - the query of the delete-request
         * @return{Boolean} - true if the query has all MANDATORY_FIELDS
         */
        this.hasAllDeleteFields = (query) => {
            return MANDATORY_FIELDS.every(item => query.hasOwnProperty(item));
        }

        /**
         * Checks if the query of the videosByUser-request hass all the required fields
         * @param{express.Request.query} query - the query of the get-request
         * @return{Boolean} - true if the query has all MANDATORY_FIELDS_VIDEOS_PER_USER
         */
        this.hasAllGetVideosByUserFields= (query) => {
            return MANDATORY_FIELDS_VIDEOS_PER_USER in query;
        }

        /**
         * Validates the name of the file to be uploaded
         * @param{string} fileName - the name of the video file to be validated
         * @return{Boolean} - true or false if the file name is valid or not
         */
        this.validFile = (fileName) => {
            return (fileName.substr(-4) == VALID_EXTENSION);
        }

    }
}
module.exports = new RequestController();