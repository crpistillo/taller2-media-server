// The routes to be accessed

const { Router } = require('express');
const router = Router();

var file_controller = require('../controllers/file.controller');

router.get('/', (req, res) => {
    res.send('Media Server\n');
});

//TODO: cambiar ruta (esta es de prueba)
router.get('/upload_file', (req, res) => {
    file_controller.upload_file(req, res);
});

module.exports = router;