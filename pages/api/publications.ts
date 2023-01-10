import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).send([
      {
        title: 'Pub 1',
        venue: {
          name: 'Kwang conference',
          short: 'KC',
        },
        authorList: [
          {
            type: 'First Author',
            name: 'Kai-Siang Wang',
          },
        ],
        abstract: '',
        bib: '',
        url: '',
      },
    ]);
  } else {
    res.status(404).send(`${req.method} /publications not found.`);
  }
}
