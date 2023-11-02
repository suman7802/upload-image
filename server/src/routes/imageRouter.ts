import multer from 'multer';
import {Router} from 'express';
import imageController from '../controllers/imageController';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const date = new Date();
    cb(null, file.fieldname + '-' + date.getTime() + '.jpg');
  },
});

const upload = multer({storage: storage});

const imageRouter = Router();
imageRouter.post('/image', upload.single('image'), imageController);

export default imageRouter;
