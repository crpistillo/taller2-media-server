// The routes to be accessed
const { Router } = require('express');
const fileController = require('../controllers/file.controller');
const swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('../swagger.json');
const SWAGGER_URL = "/swagger"

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

router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerDocument));

module.exports = router;