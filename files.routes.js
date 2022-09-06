const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/upload/', (req, res) => {
    console.log(req.files)
    res.send('File uploaded brou')
    res.send(req.files)
})

module.exports = router