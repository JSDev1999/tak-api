import express from "express";
import { uploadFileToServer } from "../controllers/fileController.js";
const fileRouter = express.Router();

fileRouter.post("/upload", uploadFileToServer);

export default fileRouter;
