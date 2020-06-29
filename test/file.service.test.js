const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const sinon = require('sinon');
require('dotenv').config();

const firebaseService = require('../src/services/firebase.service');
const fileService = require('../src/services/file.service');
const bucket = firebaseService.bucket();
const mock = require('../src/constants/testConstants');



describe('fileService', function() {

    /*
    describe('uploadVideo', function () {
        beforeEach(function () {
            sinon.stub(admin, 'initializeApp').returns("OK");
            sinon.stub(bucket, 'upload').withArgs(aFile.path).returns(Promise.resolve("OK"));
            sinon.stub(bucket, "getMetadata").returns(Promise.resolve(aMetadata));
            sinon.stub(bucket, "file").withArgs(fileService.createPath(fields)).returns(Promise.resolve("OK"));
            sinon.stub(bucket, "getSignedUrl").returns(Promise.resolve(urlWithCredential));


            //sinon.stub(bucket, "generateSignedUrl").withArgs(fileService.createPath(fields)).returns(Promise.resolve("https://chotuve-5d909.appspot.com.storage.googleapis.com/caropistilo%40gmail.com/Video%20de%20prueba"));
        });

        afterEach(function () {
            admin.initializeApp.restore();
            bucket.upload.restore();
            bucket.getMetadata.restore();
            bucket.file.restore();
            bucket.getSignedUrl.restore();
        });

        it('bucket upload returns OK', function () {
            bucket.upload(aFile.path).then(function (result) {
                expect(result).to.equal("OK");
            }).catch(function (err) {
                console.log(err);
            })
        })


        it('bucket file returns OK', function () {
            bucket.file(fileService.createPath(fields)).then(function (result) {
                expect(result).to.equal("OK");
            }).catch(function (err) {
                console.log(err);
            })
        })

        /*
                it('uploadVideo returns metadata', function () {
                    fileService.uploadVideo(aFile, fields)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch(function (err) {
                            console.log(err)
                        })
                })*/
    //})

    describe('generateSignedUrl', function () {

        beforeEach(function () {
            sinon.stub(bucket, 'getSignedUrl').returns(Promise.resolve(mock.URL_WITH_CREDENTIAL));
        })

        afterEach(function () {
            bucket.getSignedUrl.restore();
        })

        it('bucket getSignedUrl returns urlWithCredentials', function () {
            bucket.getSignedUrl().then(function (result) {
                expect(result).to.equal(mock.URL_WITH_CREDENTIAL);
            }).catch(function (err) {
                console.log(err);
            })
        })

        it('generatesSignedUrl returns url', function () {
            fileService.generateSignedUrl(fileService.createPath(mock.FIELDS)).then(function (result) {
                expect(result).to.equal(mock.URL);
            }).catch(function (err) {
                console.log(err);
            })
        })
    })

    describe('generateMetadata', function () {
        beforeEach(function () {
            const getMetadataStub = sinon.stub(bucket, "getMetadata").resolves(mock.SERIALIZED_METADATA);
            const getSignedUrlStub = sinon.stub(bucket, "getSignedUrl").resolves("url");
            sinon.stub(bucket, 'file').value({getMetadata: getMetadataStub, getSignedUrl: getSignedUrlStub});
        })

        afterEach(function () {
            bucket.getMetadata.restore();
            //bucket.file.restore();
            bucket.getSignedUrl.restore();
        });

        it('bucket getMetadata returns aMetadata', function () {
            bucket.getMetadata().then(function (result) {
                expect(result).to.equal(mock.SERIALIZED_METADATA);
            }).catch(function (err) {
                console.log(err);
            })
        })
/*
        it('generatesMetadata returns metadata', async () => {
            let res = await fileService.generateMetadata(fileService.createPath(mock.FIELDS));
            console.log(res);
        })*/
    })

    describe('validFile', function() {

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
/*
        it('listVideosByUser returns ', async () => {

            let res = await fileService.listVideosByUser(mock.USER);
            expect(res).to.equal(videos);

        })*/
    })
})

/*

    /*describe('generateMetadata', function () {
        beforeEach(function () {
            sinon.stub(admin, 'initializeApp').returns("OK");
            sinon.stub(bucket, "getMetadata").returns(Promise.resolve(aMetadata));
            //const getMetadataStub = sinon.stub(bucket, "getMetadata").returns(Promise.resolve(aMetadata));
            //sinon.stub(bucket, "file").withArgs(fileService.createPath(fields)).returns({getMetadata: getMetadataStub})
            //sinon.stub(bucket, "getSignedUrl").returns(Promise.resolve(urlWithCredential));
        });

        afterEach(function () {
            admin.initializeApp.restore();
            bucket.getMetadata.restore();
            //bucket.file.restore();
            //bucket.getSignedUrl.restore();
        });

        it('bucket getMetadata returns metadata', function () {
            bucket.getMetadata().then(function (result) {
                expect(result).to.equal(aMetadata);
            }).catch(function (err) {
                console.log(err);
            })
        })


        it('generateMetadata returns metadata', function () {
            fileService.generateMetadata(fileService.createPath(fields)).then(function (result) {
                console.log(result)
            }).catch(function (err) {
                console.log(err);
            })
        })
*/



    /*
    beforeEach(function () {
        sinon.stub(fileService, 'upload')
            .withArgs(aFile.path, uploadOptions)
            .returns(Promise.resolve("OK"));
    });

    it('Upload returns metadata',(done) => {

        fileService.upload(aFile.path, uploadOptions).then(function (result) {
            expect(result).to.equal("OK");
        }).catch(function (err) {
            console.log(err);
        })
/*
        const file = sinon.stub(bucket, "file");
        file.withArgs(fileService.createPath(fields)).resolves("OK");

        bucket.file(fileService.createPath(fields)).then(function (result) {
            expect(result).to.equal("OK");
        }).catch(function (err) {
            console.log(err);
        })

        const getMetadata = sinon.stub(bucket, "getMetadata");
        getMetadata.withArgs().resolves(metadata);

        bucket.getMetadata().then(function (result) {
            expect(result).to.equal(metadata);
        }).catch(function (err) {
            console.log(err);
        })*/
/*
        fileService.uploadVideo(aFile, fields)
            .then((result) => {
                console.log(result)
            })
            .catch(function (err) { console.log(err) })


/*

        upVideo(aFile, fields)
            .then((result) => {
            //expect(result).to.equals(metadata);
                console.log(result);
            })
            .catch(function (err) { console.log(err) })*/
/*
        done();
    })
})
*/
