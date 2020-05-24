const { Router }= require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Media Server\n');
});

module.exports = router;