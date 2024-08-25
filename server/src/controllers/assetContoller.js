import { deleteFile, saveAssetLocally } from '../libs/saveLocally.js';
import { cloduinaryUploader } from '../libs/cloudinary.js';
import { CustomError } from '../libs/CustomError.js';

export const uploadAsset = async (req, res) => {
  const filePath = await saveAssetLocally(req);

  if (filePath) {
    const url = await cloduinaryUploader(filePath);

    await deleteFile(filePath);

    return res.json({
      url,
    });
  }
  throw new CustomError(404, {
    message: 'Provide file',
  });
};
