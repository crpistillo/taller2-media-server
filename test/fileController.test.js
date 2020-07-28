const fc = require('../src/controllers/file.controller')
let fileController;
const mock = require('../src/constants/testConstants')
const fs = require('../src/services/file.service');
let fileService;
const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const supertest = require('supertest')
const util = require('util');
const messages = require('../src/constants/messages');
const app = require('../src/app');

describe('fileController', function () {

    before(function () {
        fileController = new fc();
        fileService = new fs();
    })

    describe('uploadVideo', function() {
        it('uploadVideo returns metadata', function() {
            supertest(app)
                .post('/videos')
                .field("Content-Type", "multipart/form-data")
                .field('email', mock.USER_5)
                .field('title', mock.TITLE_5)
                .attach('file', 'test/video_test.mp4')
                .expect(201)
                .end(function(err, res) {
                    if (err) throw err;
                    expect(res.body['file']).eql(mock.METADATA_5['file']);
                    expect(res.body['size']).eql(mock.METADATA_5['size']);
                    expect(res.body['url']).eql(mock.METADATA_5['url']);
                    fileService.deleteVideo(mock.FIELDS_5);
                });
        })

        it('uploadVideo returns request is not Multipart', function() {
            supertest(app)
                .post('/videos')
                .send('email=asd')
                .set('Accept', 'application/json')
                .expect(400)
                .end(function(err, res) {
                    if (err) throw err
                    expect(res.text.toString()).to.eql(util.format(messages.ERROR_JSON, messages.REQUEST_IS_NOT_MULTIPART))
                })
        });

        it('uploadVideo returns missing fields in form', function() {
            supertest(app)
                .post('/videos')
                .field("Content-Type", "multipart/form-data")
                .field('email', mock.USER_8)
                .attach('file', 'test/video_test.mp4')
                .expect(400)
                .end(function(err, res) {
                    if (err) throw err;
                    expect(res.text.toString()).to.eql(util.format(messages.ERROR_JSON, messages.MISSING_FIELDS_ERROR))
                });
        })

        it('uploadVideo returns missing fields in form', function() {
            supertest(app)
                .post('/videos')
                .field("Content-Type", "multipart/form-data")
                .field('email', mock.USER_8)
                .field('title', mock.TITLE_8)
                .attach('file', 'test/image_test.png')
                .expect(400)
                .end(function(err, res) {
                    if (err) throw err;
                    expect(res.text.toString()).to.eql(util.format(messages.ERROR_JSON, messages.INVALID_FILE_NAME_OR_EXTENSION))
                });
        })
    })

    describe('deleteVideo', function () {
        it('deleteVideo returns "video does not exist"', function () {
            supertest(app)
                .delete('/videos')
                .query({email: mock.USER_5, title: mock.TITLE_5})
                .expect(404)
                .end(function(err) {
                    if (err) throw err;
                });
        })


        it('deleteVideo returns Success', function () {
            fileService.uploadVideo(mock.SERIALIZED_FILE, mock.FIELDS_6)
                .then(() => {
                    supertest(app)
                        .delete('/videos')
                        .query({email: mock.USER_6, title: mock.TITLE_6})
                        .expect(200)
                        .expect(util.format(messages.SUCCESS_JSON,
                            util.format(messages.SUCCESS_ON_DELETE, mock.TITLE_6, mock.USER_6)))
                        .end(function(err) {
                            if (err) throw err;
                        });
                })
                .catch(function (err) {
                    console.log(err.message)
                })
        })

        it('deleteVideo returns missing fields', function () {
            fileService.uploadVideo(mock.SERIALIZED_FILE, mock.FIELDS_8)
                .then(() => {
                    supertest(app)
                        .delete('/videos')
                        .query({email: mock.USER_8})
                        .expect(400)
                        .expect(util.format(messages.ERROR_JSON, messages.MISSING_FIELDS_ERROR))
                        .end(function(err) {
                            if (err) throw err;
                            fileService.deleteVideo(mock.FIELDS_8);
                        });
                })
                .catch(function (err) {
                    console.log(err.message)
                })
        })

    })


    describe('getVideosByUser', function() {
        it('getVideosByUser returns Video list expected', function () {
            fileService.uploadVideo(mock.SERIALIZED_FILE, mock.FIELDS_7)
                .then(() => {
                    supertest(app)
                        .get('/videos')
                        .query({email: mock.USER_7})
                        .expect(200)
                        .end(function(err, res) {
                            if (err) throw err;
                            expect(res.body['user']).to.eql(mock.USER_7);
                            expect(res.body['videos'][0]['file']).to.eql(mock.METADATA_7['file']);
                            expect(res.body['videos'][0]['size']).to.eql(mock.METADATA_7['size']);
                            expect(res.body['videos'][0]['url']).to.eql(mock.METADATA_7['url']);
                            fileService.deleteVideo(mock.FIELDS_7);
                        });
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

        it('getVideosByUser returns missing fields', function () {
            supertest(app)
                .get('/videos')
                .query({title: mock.TITLE_8})
                .expect(400)
                .expect(util.format(messages.ERROR_JSON, messages.MISSING_FIELDS_ERROR))
                .end(function(err) {
                    if (err) throw err;
                });
        })

        it('getVideosByUser returns non existing user or videos', function () {
            supertest(app)
                .get('/videos')
                .query({email: mock.USER_9})
                .expect(404)
                .expect(util.format(messages.ERROR_JSON,util.format(messages.USER_HAS_NO_VIDEOS, mock.USER_9)))
                .end(function(err) {
                    if (err) throw err;
                });
        })
    })

    describe('get init path', function () {
        it('the init path returns Media Server text', function () {
            supertest(app)
                .get('/')
                .end(function (err, res) {
                    if (err) throw err;
                    expect(res.text).to.equal("Media Server\n")
                })
        })
    })


})
