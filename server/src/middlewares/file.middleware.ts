import multer from 'multer';

const fileMiddleware = multer({ dest: 'uploads/' });

export default fileMiddleware.single('file');
