import { Router } from "express";
import multer, { memoryStorage } from "multer";
import { FileController } from "../controllers/FileController";
import fileConverter from "../middleware/fileConverter";

const fileRoute = Router();

const upload = multer({
  storage: memoryStorage(),
});

fileRoute.post(
  "/checkFile",
  upload.single("csvFile"),
  fileConverter,
  FileController.checkFile
);

fileRoute.post(
  "/updatePrice",
  upload.single("csvFile"),
  fileConverter,
  FileController.updatePrice
);

export default fileRoute;
