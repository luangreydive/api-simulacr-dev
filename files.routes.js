const {Router} = require('express')
const {uploadFile} = require('./s3')
const router = Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/upload/', async (req, res) => {
    //console.log(req.files['video'])
    const response = await uploadFile(req.files['video'])
    console.log(response)
    return response
})

module.exports = router