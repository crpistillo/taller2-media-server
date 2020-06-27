// The routes to be accessed
const { Router } = require('express');
var fileController = require('../controllers/file.controller');

const router = Router();

router.get('/', (req, res) => {
    res.send('Media Server\n');
});

router.post('/videos', (req, res) => {
    fileController.uploadVideo(req, res);
});

router.delete('/videos', (req, res) => {
   fileController.deleteVideo(req, res);
});

router.get('/videos', (req, res) => {
    fileController.getVideosByUser(req, res);
});

module.exports = router;