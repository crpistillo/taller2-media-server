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
    })

    it('isMultipart returns false', function() {
        req = new mockExpressRequest();
        expect(requestController.isMultipart(req)).to.be.false;
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

    describe('validFile', function () {

        it('valid File returns true if the format is valid', function () {
            chai.assert.equal(requestController.validFile("prueba.mp4"), true);
        })

        it('valid file returns false if the format is not valid', function () {
            chai.assert.equal(requestController.validFile("prueba.png"), false)
        })
    })


})