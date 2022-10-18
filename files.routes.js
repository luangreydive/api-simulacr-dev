const {Router} = require('express')
const {uploadFile} = require('./s3')
const router = Router()
const fs = require('fs');

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/upload/', async (req, res) => {
    //console.log(req.files['video'])
    const response = await uploadFile(req.files['video'])
    console.log(response)
    console.log(req.files['video'])
    res.send('Archivo subido')
    //unlink file

    fs.unlink(req.files['video'].tempFilePath, (err) => {
        if (err) throw err;
        console.log('successfully deleted');
    });

})

module.exports = router