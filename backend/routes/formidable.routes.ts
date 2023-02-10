import express from "express";
import { knex } from "../client";
import { FormidableController } from "../controllers/formidable.controller";
import { FormidableService } from "../services/formidable.service";
import fs from "fs";
import formidable from "formidable";

export const FormidableRouter = express.Router();

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
  uploadDir,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});

let formidableService = new FormidableService(knex);
let formidableController = new FormidableController(formidableService, form);

FormidableRouter.post("/userIcon", formidableController.awsUploadOnlyIcon);
FormidableRouter.post("/newactivity", formidableController.awsUpload);
