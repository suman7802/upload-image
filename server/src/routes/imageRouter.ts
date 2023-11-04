import multer from 'multer';
import {Router} from 'express';
import imageController from '../controllers/imageController';

const imageRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const uniqueName = file.fieldname + '-' + date.getTime() + '.jpg';
    cb(null, uniqueName);
  },
});

const upload = multer({storage: storage});

imageRouter.post(
  '/upload',
  upload.fields([
    {name: 'signature', maxCount: 1},
    {name: 'passPhoto', maxCount: 1},
  ]),
  imageController
);

export default imageRouter;
