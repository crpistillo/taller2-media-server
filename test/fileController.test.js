const fc = require('../src/controllers/file.controller')
let fileController;
const request = require('supertest');
const express = require('express');
const mock = require('../src/constants/testConstants')
const messages = require('../src/constants/messages')
const fs = require('../src/services/file.service');
let fileService;

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
                .expect(400)
                .expect({
                    status: 'Error',
                    message: messages.NON_EXISTING_FILE_ERROR
                })
                .end(function(err, res) {
                    if (err) throw err;
                });
        })
/*
        it('deleteVideo returns "missing fields"', function () {
            request(app)
                .delete('/videos')
                .query({email: mock.USER_5})
                .expect(400)
                .expect({status:"Error", message: messages.MISSING_FIELDS_ERROR})
                .end(function(err, res) {
                    if (err) throw err;
                });
        })*/

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
                .expect(200)
                .expect(mock.METADATA_5)
                .end(function(err, res) {
                    if (err) throw err;
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
                        .expect(mock.USER_7_VIDEO_LIST_CONTROLLER)
                        .end(function(err, res) {
                            if (err) throw err;
                            fileService.deleteVideo(mock.FIELDS_7);
                        });
                })
                .catch(function (err) {
                    console.log(err)
                })
        })
    })


})
