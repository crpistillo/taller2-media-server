const router = require('../src/routes/index')

describe('Router', function () {

    it('GET /', function () {
        router.get('/')
    })
    it('GET /videos', function () {
        router.get('/videos')
    })
    it('POST /videos', function () {
        router.post('/videos')
    })
    it('DELETE /videos', function () {
        router.delete('/videos')
    })
})