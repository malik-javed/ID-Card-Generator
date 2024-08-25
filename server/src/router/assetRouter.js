import { Router } from 'express';
import { uploadAsset } from '../controllers/assetContoller.js';

const assetRouter = Router();

assetRouter.post('/', uploadAsset);

export { assetRouter };
