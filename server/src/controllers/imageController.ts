import {Request, Response} from 'express';

export default function imageController(req: Request, res: Response) {
  res.send('Image uploaded successfully!');
}
