import { FormidableService } from "../services/formidable.service";
import Formidable from "formidable/Formidable";
import { Request, Response } from "express";
import { env } from "../env";
import aws from "aws-sdk";
import formidable from "formidable";
import stream from "stream";

export class FormidableController {
  counter = 0;
  s3: aws.S3;

  constructor(
    private formidableService: FormidableService,
    //@ts-ignore
    private form: Formidable
  ) {
    let credentials = new aws.Credentials({
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    });
    this.s3 = new aws.S3({
      credentials,
      region: env.S3_REGION,
    });
  }

  awsUpload = (req: Request, res: Response) => {
    let uploads: aws.S3.ManagedUpload[] = [];
    let filename = "";
    let form = new formidable.Formidable({
      fileWriteStreamHandler: () => {
        let passThroughStream = new stream.PassThrough();
        let upload = this.s3.upload(
          {
            Body: passThroughStream,
            Bucket: env.S3_BUCKET_NAME,
            Key: filename,
          },
          {}
        );
        console.log("accessed to formidable controller");
        upload.send();
        uploads.push(upload);
        return passThroughStream;
      },
      filename: (name, ext, part, form) => {
        let field = part.name;
        let timestamp = Date.now();
        this.counter++;
        filename = `${field}-${timestamp}-${this.counter}`;
        console.log({ filename });
        return filename;
      },
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        uploads.forEach((upload) => upload.abort());
        res
          .status(400)
          .json({ error: "Failed to parse form data. " + String(err) });
        return;
      }
      console.log("fields to controller", fields);
      console.log("files to controller", files);

      let activity_name = fields.activity_name + "";
      let type = fields.type + "";
      let tag = fields.tag + "";
      let opening_time = fields.opening_time + "";
      let closing_time = fields.closing_time + "";
      let description = fields.description + "";
      let country = fields.country + "";
      let latitude = +fields.latitude;
      let longitude = +fields.longitude;
      let rating = +fields.rating;

      Promise.all(uploads.map((upload) => upload.promise()))
        .then((s3Files) => {
          console.log("s3 Files0239203920392:", s3Files);
          this.formidableService.awsUpload(
            activity_name,
            type,
            tag,
            opening_time,
            closing_time,
            description,
            country,
            latitude,
            longitude,
            rating,
            s3Files[0].Location
          );
          // TODO pass to fileService to store the s3 keys into database
          res.json({ fields, files, s3Files });
        })
        .catch((err) => {
          uploads.forEach((upload) => upload.abort());
          res
            .status(502)
            .json({ error: "Failed to upload to S3. " + String(err) });
        });
    });
  };
  awsUploadOnlyIcon = (req: Request, res: Response) => {
    let id = req.query.id;
    let uploads: aws.S3.ManagedUpload[] = [];
    let filename = "";
    let form = new formidable.Formidable({
      fileWriteStreamHandler: () => {
        let passThroughStream = new stream.PassThrough();
        let upload = this.s3.upload(
          {
            Body: passThroughStream,
            Bucket: env.S3_BUCKET_NAME,
            Key: filename,
          },
          {}
        );
        upload.send();
        uploads.push(upload);
        return passThroughStream;
      },
      filename: (name, ext, part, form) => {
        let field = part.name;
        let timestamp = Date.now();
        this.counter++;
        filename = `${field}-${timestamp}-${this.counter}.${ext}`;
        console.log({ filename });
        return filename;
      },
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        uploads.forEach((upload) => upload.abort());
        res
          .status(400)
          .json({ error: "Failed to parse form data. " + String(err) });
        return;
      }
      console.log("fields to controller", fields);
      console.log("files to controller", files);

      Promise.all(uploads.map((upload) => upload.promise()))
        .then((s3Files) => {
          console.log("s3 Files0239203920392:", s3Files);
          this.formidableService.awsUploadIcon(id, s3Files[0].Location);

          // TODO pass to fileService to store the s3 keys into database
          res.json({ fields, files, s3Files });
        })
        .catch((err) => {
          uploads.forEach((upload) => upload.abort());
          res
            .status(502)
            .json({ error: "Failed to upload to S3. " + String(err) });
        });
    });
  };
}

// function toArray<T>(field: T[] | T | undefined): T[] {
//   if (Array.isArray(field)) {
//     return field;
//   }
//   if (!field) {
//     return [];
//   }
//   return [field];
// }
