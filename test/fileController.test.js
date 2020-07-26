const fc = require('../src/controllers/file.controller')
let fileController;
const request = require('supertest');
const express = require('express');
const mock = require('../src/constants/testConstants')
const messages = require('../src/constants/messages')
const fs = require('../src/services/file.service');
let fileService;
const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;

const app = express();

app.post('/videos', (req, res) => {
    fileController.uploadVideo(req, res);
});

app.delete('/videos', (req, res) => {
    fileController.deleteVideo(req, res);
});

app.get('/videos', (req, res) => {
    fileController.getVideosByUser(req, res);
});

describe('fileController', function () {

    before(function () {
        fileController = new fc();
        fileService = new fs();
    })

    after(function () {
        delete fileController;
        delete fileService;
    })

    describe('deleteVideo', function () {
        it('deleteVideo returns "video does not exist"', function () {
            request(app)
                .delete('/videos')
                .query({email: mock.USER_5, title: mock.TITLE_5})
                .expect(404)
                .expect({
                    status: 'Error',
                    message: messages.NON_EXISTING_FILE_ERROR
                })
                .end(function(err, res) {
                    if (err) throw err;
                });
        })


        it('deleteVideo returns Success', function () {
            fileService.uploadVideo(mock.SERIALIZED_FILE, mock.FIELDS_6)
                .then(() => {
                    request(app)
                        .delete('/videos')
                        .query({email: mock.USER_6, title: mock.TITLE_6})
                        .expect(200)
                        .expect({
                            status: 'Success',
                            message: "The video under the title '" + mock.TITLE_6 + "' was successfully deleted"
                        })
                        .end(function(err, res) {
                            if (err) throw err;
                        });
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

    })

    describe('uploadVideo', function() {
        it('uploadVideo returns metadata', function() {
            request(app)
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
    })

    describe('getVideosByUser', function() {
        it('getVideosByUser returns Video list expected', function () {
            fileService.uploadVideo(mock.SERIALIZED_FILE, mock.FIELDS_7)
                .then(() => {
                    request(app)
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
    })


})
