import { Router } from 'express';
import fileMiddleware from './middlewares/file.middleware';
import UploadController from './controllers/upload/upload.controller';
import AskController from './controllers/ask/ask.controller';

const appRouter = Router();

appRouter.post('/upload', fileMiddleware, new UploadController().handle);
appRouter.post('/ask', fileMiddleware, new AskController().handle);

export default appRouter;
