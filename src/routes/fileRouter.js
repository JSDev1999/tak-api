import express from "express";
import {
  getFileFromServer,
  uploadFileToServer,
} from "../controllers/fileController.js";
const fileRouter = express.Router();

import multer from "multer";
const upload = multer({ dest: "uploads/" });

fileRouter.post("/upload", upload.single("file"), uploadFileToServer);
fileRouter.get("/upload/:key", getFileFromServer);
export default fileRouter;
