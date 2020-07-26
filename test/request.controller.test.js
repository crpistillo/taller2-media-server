const requestController = require('../src/controllers/request.controller')
const mock = require('../src/constants/testConstants')
const chai = require('chai');
const expect = chai.expect;
var mockExpressRequest = require('mock-express-request');

describe('RequestController', function() {

    it('hasAllUploadFields returns true', function () {
        expect(requestController.hasAllUploadFields(mock.VALID_FILES, mock.FIELDS_1)).to.be.true;
    })

    it('hasAllUploadFields returns false', function () {
        expect(requestController.hasAllUploadFields(mock.INVALID_FILES, mock.FIELDS_1)).to.be.false;
    })

    it('isMultipart returns true', function() {
        req = new mockExpressRequest({ headers: {'content-type': 'multipart/form-data'} });
        expect(requestController.isMultipart(req)).to.be.true;
        delete req;
    })

    it('isMultipart returns false', function() {
        req = new mockExpressRequest();
        expect(requestController.isMultipart(req)).to.be.false;
        delete req;
    })

    it('hasAllDeleteFields returns true', function () {
        expect(requestController.hasAllDeleteFields(mock.FIELDS_1)).to.be.true;
    })

    it('hasAllDeleteFields returns false', function () {
        expect(requestController.hasAllDeleteFields(mock.INVALID_FIELDS)).to.be.false;
    })

    it('hasAllGetVideosByUserFields returns true', function () {
        expect(requestController.hasAllGetVideosByUserFields(mock.FIELDS_1)).to.be.true;
    })

    it('hasAllGetVideosByUserFields returns false', function () {
        expect(requestController.hasAllGetVideosByUserFields(mock.INVALID_FIELDS)).to.be.false;
    })


})