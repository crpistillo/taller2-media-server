// The routes to be accessed

const { Router } = require('express');
const router = Router();

var fileController = require('../controllers/file.controller');

router.get('/', (req, res) => {
    res.send('Media Server\n');
});

router.post('/uploadVideo', (req, res) => {
    fileController.uploadVideo(req, res);
});

module.exports = router;