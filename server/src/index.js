import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import path from "path";

import { notFound } from "./middlewares/not-found.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler-middleware.js";
import { idCardRouters } from "./router/idCardRouters.js";
import { conenctDB } from "./libs/connectDB.js";
import { assetRouter } from "./router/assetRouter.js";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.disable("x-powered-by");

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(process.cwd(), "__tmp__"),
    createParentPath: true,
    safeFileNames: true,
    uriDecodeFileNames: true,
    uploadTimeout: 60_000,
    preserveExtension: true,
  })
);

app.use("/api/v1/idcards", idCardRouters);
app.use("/api/v1/assets", assetRouter);
app.get(["/health", "/"], (req, res) => {
  res.json({
    message: "Server is running!",
  });
});

app.use(notFound);
app.use(errorHandlerMiddleware);
const PORT = process.env.PORT || 4000;

conenctDB()
  .then(() => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log(`server is running on: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("exiting the process");
    process.exit();
  });
