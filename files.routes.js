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
    res.send('Archivo subido')
})

module.exports = router