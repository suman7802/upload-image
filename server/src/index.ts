import fs from 'fs';
require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import imageRouter from './routes/imageRouter';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

const uploadDirectory = 'uploads/';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', imageRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port  ${PORT}`);
});
