import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import S3 from "aws-sdk/clients/s3";

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const bucketAccessKey = process.env.AWS_ACCESS_KEY;
const bucketSecretKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  bucketRegion,
  bucketAccessKey,
  bucketSecretKey,
});

// upload to s3
export function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}
