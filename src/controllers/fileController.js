import { HttpStatus, Response } from "../helpers/Response.js";
import fileModel from "../models/fileModel.js";
import { getFileStream, uploadFile } from "../utils/s3File.js";

const uploadFileToServer = async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    const fileresults = await fileModel.create({ file: result?.key });
    return res
      .status(HttpStatus.OK.code)
      .json(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "file upload successful",
          fileresults
        )
      );
  } catch (error) {
    return res
      .status(HttpStatus.OK.code)
      .json(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, error.message)
      );
  }
};

const getFileFromServer = async (req, res) => {
  try {
    const results = await fileModel.findById(req.params?.key);

    const key = results?.file;
    const readStream = getFileStream(key);

    readStream.pipe(res);
  } catch (error) {
    return res
      .status(HttpStatus.OK.code)
      .json(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, error.message)
      );
  }
};

const getAllFileFromServer = async (req, res) => {
  try {
    const results = await fileModel.find();
    return res
      .status(HttpStatus.OK.code)
      .json(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "operation successful",
          results
        )
      );
  } catch (error) {
    return res
      .status(HttpStatus.OK.code)
      .json(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, error.message)
      );
  }
};

export { uploadFileToServer, getFileFromServer, getAllFileFromServer };
