import {
  createIdCard,
  updateIdCard,
  deleteIdCard,
  getIdCard,
  getIdCards,
} from '../controllers/idCardControllers.js';

import { Router } from 'express';
import { validateRequest } from '../middlewares/request-validation-middleware.js';
import { idCardSchema, ObjectIdParamSchema } from '../libs/zod-schemas.js';

const idCardRouters = Router();

idCardRouters
  .route('/')
  .get(getIdCards)
  .post(validateRequest(idCardSchema, 'body'), createIdCard);

idCardRouters
  .route('/:idCardId')
  .put(validateRequest(ObjectIdParamSchema('idCardId'), 'params'), updateIdCard)
  .delete(
    validateRequest(ObjectIdParamSchema('idCardId'), 'params'),
    deleteIdCard
  )
  .get(validateRequest(ObjectIdParamSchema('idCardId'), 'params'), getIdCard);

export { idCardRouters };
