// The routes to be accessed
const { Router } = require('express');
var fileController = require('../controllers/file.controller');

const router = Router();

router.get('/', (req, res) => {
    res.send('Media Server\n');
});

router.post('/uploadVideo', (req, res) => {
    fileController.uploadVideo(req, res);
});

router.delete('/deleteVideo', (req, res) => {
   fileController.deleteVideo(req, res);
});

router.get('/videosByUser', (req, res) => {
    fileController.getVideosByUser(req, res);
});

module.exports = router;