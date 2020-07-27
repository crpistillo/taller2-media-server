const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const sinon = require('sinon');
require('dotenv').config();

const fbs= require('../src/services/firebase.service');
let firebaseService;
const fs = require('../src/services/file.service');
let fileService;
let bucket;
const mock = require('../src/constants/testConstants');
const messages = require('../src/constants/messages');

describe('fileService', function() {

    before(function(){
        firebaseService = new fbs(process.env.CREDENTIALS_TEST, process.env.BUCKET_NAME_TEST)
        bucket = firebaseService.bucket();
        fileService = new fs();
    })

    describe('generateSignedUrl', function () {

        it('generatesSignedUrl returns url', function () {
            let url = fileService.generateUrl(fileService.createPath(mock.FIELDS_1))
            expect(url).to.equal(mock.URL_1);
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
                 expect(err).to.equal("No such object: " + process.env.BUCKET_NAME_TEST +
                     '/' + mock.USER_1 + '/' + mock.TITLE_1);
            })
        })

    })

    describe('listVideosByUser', function () {

        it('listVideosByUser returns Video List Expected', function () {
            fileService.uploadVideo(mock.SERIALIZED_FILE, mock.FIELDS_2)
                .then(async () => {
                    await fileService.listVideosByUser(mock.USER_2)
                        .then(async(res) => {
                            let videos = await fileService.generateMetadataByUser(res);
                            fileService.deleteVideo(mock.FIELDS_2);
                            expect(videos[0]['file']).to.eql(mock.METADATA_2['file']);
                            expect(videos[0]['size']).to.eql(mock.METADATA_2['size']);
                            expect(videos[0]['url']).to.eql(mock.METADATA_2['url']);
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
                    expect(result['file']).to.eql(mock.METADATA_1['file']);
                    expect(result['size']).to.eql(mock.METADATA_1['size']);
                    expect(result['url']).to.eql(mock.METADATA_1['url']);
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
                    expect(result['file']).to.eql(mock.METADATA_3['file']);
                    expect(result['size']).to.eql(mock.METADATA_3['size']);
                    expect(result['url']).to.eql(mock.METADATA_3['url']);
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
                            expect(videos[0]['file']).to.eql(mock.METADATA_4['file']);
                            expect(videos[0]['size']).to.eql(mock.METADATA_4['size']);
                            expect(videos[0]['url']).to.eql(mock.METADATA_4['url']);
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






