const app = require('express')();
//require cors and use
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {uploadFile} = require('./s3')

const unlinkFolder = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                unlinkFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

const generateRandomCode = () => {
    let code = ''
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10)
    }
    return code
}

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use(fileUpload());

app.post('/upload/', async (req, res) => {
    let videosArray = []
    let dir = './videos';
    let cliente = req.body.cliente;
    let testeador = req.body.testeador;
    let id = req.body.id;
    let fragmento = req.body.fragmento;
    let idVideo = generateRandomCode()

    res.send('Archivo subido')


    /****************ESTO FUNCIONA **************/

    fs.mkdirSync(`${dir}/${cliente}/${testeador}`, { recursive: true })
    fs.writeFile(`${dir}/${cliente}/${testeador}/${fragmento}.webm`, req.files['video'].data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    }
    );


    setTimeout(() => {
        fragmento === 'final' && fs.readdir(`${dir}/${cliente}/${testeador}`, (err, files) => {
    
            console.log(files)
    
            const source = ffmpeg({ source: `${dir}/${cliente}/${testeador}/1.webm` })
    
            for (let file of files){
                if(file !== '1.webm'){
                source.addInput(`${dir}/${cliente}/${testeador}/${file}`)
                }
            }
    
            source.on('error', function (err) {
                console.log('An error occurred: ' + err.message);
            })
    
            source.on('end', async function () {
                console.log('Merging finished !');
                await uploadFile(`${dir}/${cliente}/${testeador}/${id}_${idVideo}.webm`, cliente, idVideo)
                unlinkFolder(`${dir}/${cliente}/${testeador}`)
            })

    
            source.mergeToFile(`${dir}/${cliente}/${testeador}/${id}_${idVideo}.webm`)
    
        })
    }, 5000);


    /******************************/




})


app.listen(3000, () => {
    console.log('Server on port 3000')
})
