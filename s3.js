require('dotenv').config()

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')

const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION



const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY
  }
})

async function uploadFile(file) {

  const stream = fs.createReadStream(file.tempFilePath)
  const cliente = file.name.slice(0, file.name.indexOf('+'))
  const id = file.name.slice(file.name.indexOf('+') + 1, file.name.indexOf('.'))
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream,
    Metadata:{
      'Cliente': cliente
    },
    Tagging: 'Cliente=' + cliente,
    Tagging: 'id=' + id  
  }

  

  const command = new PutObjectCommand(uploadParams)


  return await client.send(command)

}

module.exports = {
  uploadFile
}