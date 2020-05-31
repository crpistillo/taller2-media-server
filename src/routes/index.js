// The routes to be accessed

const { Router } = require('express');
const router = Router();

var fileController = require('../controllers/file.controller');

router.get('/', (req, res) => {
    res.send('Media Server\n');
});

//TODO: cambiar ruta (esta es de prueba)
router.post('/uploadFile', (req, res) => {
    fileController.uploadFile(req, res);
});

module.exports = router;