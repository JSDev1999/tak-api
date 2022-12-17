import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
//import S3 from "aws-sdk/clients/s3";
import AWS from "aws-sdk";

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const bucketAccessKey = process.env.AWS_ACCESS_KEY;
const bucketSecretKey = process.env.AWS_SECRET_KEY;

const initalS3 = new AWS.S3({
  bucketRegion,
  bucketAccessKey,
  bucketSecretKey,
});

// upload to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return initalS3.upload(uploadParams).promise();
}

// get filestream
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return initalS3.getObject(downloadParams).createReadStream();
}

export { uploadFile, getFileStream };
