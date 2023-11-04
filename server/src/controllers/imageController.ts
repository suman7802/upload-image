import {Request, Response} from 'express';

export default function imageController(req: Request, res: Response) {
  const name = req.body.name;
  const avatar = req.body.avatar;
  console.log(name, avatar);

  res.send('Image uploaded successfully!');
}
