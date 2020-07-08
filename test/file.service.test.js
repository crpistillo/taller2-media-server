const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const sinon = require('sinon');
require('dotenv').config();

const firebaseService = require('../src/services/firebase.service');
const fileService = require('../src/services/file.service');
const bucket = firebaseService.bucket();
const mock = require('../src/constants/testConstants');
const messages = require('../src/constants/messages');

describe('fileService', function() {

    //getSignedUrl funciona sin firebase (offline), genera localmente la url => no la mockeo
    describe('generateSignedUrl', function () {

        it('generatesSignedUrl returns url', function () {
            let url = fileService.generateUrl(fileService.createPath(mock.FIELDS_1))
            expect(url).to.equal(mock.URL_1);
        })
    })

    describe('generateMetadata', function () {
        it('generateMetadata returns metadata', function () {
            let result = fileService.generateMetadata(fileService.createPath(mock.FIELDS_1))
                expect(result).to.eql(mock.METADATA_1).but.not.equal(mock.METADATA_1);
        })
    })

    describe('validFile', function () {

        it('valid File returns true if the format is valid', function () {
            chai.assert.equal(fileService.validFile("prueba.mp4"), true);
        })

        it('valid file returns false if the format is not valid', function () {
            chai.assert.equal(fileService.validFile("prueba.png"), false)
        })
    })

    describe('deleteVideo', function () {

        beforeEach(function () {
            sinon.stub(bucket, 'delete').returns(Promise.resolve(mock.SUCCESS))
        })

        afterEach(function () {
            bucket.delete.restore();
        })

        it('bucket delete returns SUCCESS', function () {
            bucket.delete().then(function (result) {
                expect(result).to.equal(mock.SUCCESS);
            }).catch(function (err) {
                console.log(err);
            })
        })

        it('deleteVideo with no existing file returns NON_EXISTING_FILE_ERROR', function () {
            fileService.deleteVideo(mock.FIELDS_1)
                .catch(function (err) {
                 expect(err).to.equal(messages.NON_EXISTING_FILE_ERROR);
            })
        })

        //todo: DELETEBUCKET


    })

    describe('listVideosByUser', function () {

        let videos = [];
        videos.push(mock.SERIALIZED_VIDEO_A);
        videos.push(mock.SERIALIZED_VIDEO_B);


        beforeEach(function () {
            sinon.stub(bucket, 'getFiles').returns(Promise.resolve(videos))
        })

        afterEach(function () {
            bucket.getFiles.restore();
        })

        it('bucket getFiles returns SUCCESS', function () {
            bucket.getFiles(mock.LIST_OPTIONS).then(function (result) {
                expect(result).to.equal(videos);
            }).catch(function (err) {
                console.log(err);
            })
        })

        it('listVideosByUser returns Video List Expected', function () {
            fileService.uploadVideo(mock.SERIALIZED_FILE, mock.FIELDS_2)
                .then(async () => {
                    await fileService.listVideosByUser(mock.USER_2)
                        .then((res) => {
                            let videos = fileService.generateMetadataByUser(res);
                            fileService.deleteVideo(mock.FIELDS_2);
                            expect(videos).to.eql(mock.USER_2_VIDEO_LIST).but.not.equal(mock.USER_2_VIDEO_LIST);
                        })

                })
                .catch(function (err) {
                    console.log(err)
                })
        })
    })


    describe('uploadVideo', function () {
        beforeEach(function () {
            sinon.stub(bucket, 'upload').withArgs(mock.SERIALIZED_FILE.path).returns(Promise.resolve(mock.SUCCESS));
        });

        afterEach(function () {
            bucket.upload.restore();
        });

        it('bucket upload returns SUCCESS', function () {
            bucket.upload(mock.SERIALIZED_FILE.path).then(function (result) {
                expect(result).to.equal(mock.SUCCESS);
            }).catch(function (err) {
                console.log(err);
            })
        })

        it('uploadVideo returns metadata', function () {
            fileService.uploadVideo(mock.SERIALIZED_FILE, mock.FIELDS_1)
                .then((result) => {
                    expect(result).to.eql(mock.METADATA_1).but.not.equal(mock.METADATA_1);
                    fileService.deleteVideo(mock.FIELDS_1);
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

        it('uploadVideo returns INVALID_FILE_NAME_OR_EXTENSION', function(){
            fileService.uploadVideo(mock.SERIALIZED_BAD_FILE, mock.FIELDS_1)
                .catch(function (err) {
                    expect(err).to.equal(messages.INVALID_FILE_NAME_OR_EXTENSION);
                })
        })

        it('uploadVideo with description returns metadata', function () {
            fileService.uploadVideo(mock.SERIALIZED_FILE, mock.FIELDS_3)
                .then((result) => {
                    expect(result).to.eql(mock.METADATA_3).but.not.equal(mock.METADATA_3);
                    fileService.deleteVideo(mock.FIELDS_3);
                })
                .catch(function (err) {
                    console.log(err)
                })
        })
    })

    describe('getVideosByUser', function () {

        it('getVideosByUser returns Video List Expected', function () {
            fileService.uploadVideo(mock.SERIALIZED_FILE, mock.FIELDS_4)
                .then(function () {
                    fileService.getVideosByUser(mock.USER_4)
                        .then((videos) => {
                            expect(videos).to.eql(mock.USER_4_VIDEO_LIST).but.not.equal(mock.USER_4_VIDEO_LIST);
                            fileService.deleteVideo(mock.FIELDS_4);
                        })
                        .catch(function (err) {
                            console.log(err)
                        })
                })
                .catch(function (err) {
                    console.log(err)
                })
        })
    })
})






