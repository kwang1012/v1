import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).send([
      {
        id: 1,
        name: 'Tag1',
        posts: { count: 1 },
      },
    ]);
  } else {
    res.status(404).send(`${req.method} /post-categories not found.`);
  }
}
