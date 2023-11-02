import fs from 'fs';
require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import imageRouter from './routes/imageRouter';

const app = express();
const PORT = process.env.PORT || 8000;

const uploadDirectory = 'uploads/';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', imageRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port  ${PORT}`);
});
