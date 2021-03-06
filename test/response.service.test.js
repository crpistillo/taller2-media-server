const responseService = require('../src/services/response.service');
const chai = require('chai');
const expect = chai.expect;
const mock = require('../src/constants/testConstants')
var messages = require('../src/constants/messages');
var mockExpressResponse = require('mock-express-response');

describe('ResponseService', function() {

    let res;

    beforeEach(function () {
        res = new mockExpressResponse();
    })

    it('successOnUpload', function () {
        responseService.successOnUpload(res, mock.METADATA_1, "title");
        expect(res.statusCode).to.eql(201);
        expect(res._getJSON()).to.eql(mock.METADATA_1).but.not.equal(mock.METADATA_1);
    })

    it('notMultipart', function () {
        responseService.notMultipart(res);
        expect(res.statusCode).to.eql(400);
        expect(res._getJSON()).to.eql({ status: 'Error', message: messages.REQUEST_IS_NOT_MULTIPART});
    })

    it('missingField', function () {
        responseService.missingField(res);
        expect(res.statusCode).to.eql(400);
        expect(res._getJSON()).to.eql({ status: 'Error', message: messages.MISSING_FIELDS_ERROR});
    })

    it('uploadError', function () {
        const message = 'An error occurred';
        const error = {
            "message": message
        }
        responseService.uploadError(res, error);
        expect(res.statusCode).to.eql(400);
        expect(res._getJSON()).to.eql({ status: 'Error', message: 'An error has ocurred while uploading the file: ' + message});
    })

    it('successOnDelete', function () {
        responseService.successOnDelete(res, mock.FIELDS_1);
        expect(res.statusCode).to.eql(200);
        expect(res._getJSON()).to.eql({ status: 'Success',
            message: "The video " + mock.TITLE_1 + " from user " + mock.USER_1 + " was successfully deleted"});
    })

    it('deleteError', function () {
        const message = "An error has occurred";
        responseService.deleteError(res, message);
        expect(res.statusCode).to.eql(404);
        expect(res._getJSON()).to.eql({ status: 'Error', message: "An error has occurred while deleting the file: " + message});
    })

    it('successOnGetVideosByUser', function () {
        responseService.successOnGetVideosByUser(res, mock.USER_2_VIDEO_LIST, mock.USER_2)
        expect(res.statusCode).to.eql(200);
        expect(res._getJSON()['user']).to.eql(mock.USER_2);
        expect(res._getJSON()['videos'][0]['file']).to.eql(mock.METADATA_2['file']);
        expect(res._getJSON()['videos'][0]['size']).to.eql(mock.METADATA_2['size']);
        expect(res._getJSON()['videos'][0]['url']).to.eql(mock.METADATA_2['url']);
    })

    it('getVideosByUserError', function () {
        const message = "An error has occurred";
        responseService.getVideosByUserError(res, message)
        expect(res.statusCode).to.eql(404);
        expect(res._getJSON()).to.eql({ status: 'Error', message: message}
        );
    })
});
