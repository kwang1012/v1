import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      res.status(200).send([]);
    } else if (req.method === 'POST') {
      res
        .status(200)
        .send(
          "This is a dummy server so this op can't be fulfilled. We suggest you to build your own backend server or clone the project(https://github.com/kwang1012/kkapp)"
        );
    } else {
      res.status(404).send(`${req.method} /messages not found.`);
    }
  }
  