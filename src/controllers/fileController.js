import multer from "multer";
import { HttpStatus, Response } from "../helpers/Response.js";
import { uploadFile } from "../utils/s3File.js";
const upload = multer({ dest: "uploads/" });


export const uploadFileToServer = upload.single('file') = async(req,res) => {
    try {
        const file = req.file
        console.log(file)
        const result = await uploadFile(file)
        console.log(result)
    } catch (error) {
          return res
      .status(HttpStatus.OK.code)
      .json(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, error.message)
      );
    }
}
