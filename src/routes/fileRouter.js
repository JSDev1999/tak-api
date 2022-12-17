import express from "express";
import {
  getAllFileFromServer,
  getFileFromServer,
  uploadFileToServer,
} from "../controllers/fileController.js";
import { verifyToken } from "../middlewares/requireLogin.js";
const fileRouter = express.Router();

import multer from "multer";

const upload = multer({ dest: "uploads/" });

fileRouter.post(
  "/upload",
  verifyToken,
  upload.single("file"),
  uploadFileToServer
);
fileRouter.get("/upload/:key", verifyToken, getFileFromServer);
fileRouter.get("/getall", verifyToken, getAllFileFromServer);

export default fileRouter;
