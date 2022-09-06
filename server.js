const express = require('express');
const fileUpload = require('express-fileupload');
const fileRouter = require('./files.routes');
const cors = require('cors');

const app = express();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}));

app.use(cors());

app.use(fileRouter);

app.listen(3000);
console.log('Server on port 3000');