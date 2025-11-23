import { Router } from 'express';
import fileMiddleware from './middlewares/file.middleware';
import UploadController from './controllers/upload/upload.controller';

const appRouter = Router();

appRouter.get('/upload', (req, res) => {
  res.status(200).json({
    message: 'oi'
  })
});
appRouter.post('/upload', fileMiddleware, new UploadController().handle);

export default appRouter;
