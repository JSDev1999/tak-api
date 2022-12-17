import express from "express";
import fileRouter from "./fileRouter.js";
import userRouter from "./userRouter.js";

const appRouter = express.Router();

// user route
appRouter.use("/user", userRouter);
appRouter.use("/file", fileRouter);

export default appRouter;
