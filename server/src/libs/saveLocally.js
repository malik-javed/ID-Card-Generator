import { CustomError } from "./CustomError.js";
import path from "path";
import fs from "fs";

// Function to save a single file locally
export const saveAssetLocally = async (req, folderName = "") => {
  return new Promise((resolve, reject) => {
    if (!req.files || !req.files.media) {
      throw new CustomError(400, { message: "No files were uploaded." });
    }

    let media = req.files.media;
    // If media is an array, reject as this function is for single files
    if (Array.isArray(media)) {
      throw new CustomError(404, {
        message: "Expected a single file, but received multiple.",
      });
    }
    console.log("media: ", media);
    const fileName = path.parse(media.name).name;

    const extName = path.extname(media.name);

    const uploadPath = path.join(
      process.cwd(),
      "assets",
      folderName,
      `${fileName}__${Math.random().toString().slice(3)}${extName}`
    );

    media.mv(uploadPath, (err) => {
      if (err) {
        reject(new CustomError(404, { message: "Error saving the file." }));
      } else {
        resolve(uploadPath);
      }
    });
  });
};

export const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(
          new CustomError(404, {
            message: `Error deleting the file: ${filePath}`,
          })
        );
      } else {
        resolve();
      }
    });
  });
};
