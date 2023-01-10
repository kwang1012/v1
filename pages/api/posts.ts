import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).send({
      data: [
        {
          id: 1,
          title: 'Post 1',
          abstract: "Post's abstract",
          createdAt: new Date(),
          content:
            "This is a dummy post's content. We suggest you to build your own backend server or clone the project(https://github.com/kwang1012/kkapp)",
          slug: 'post1',
          post_category: {
            name: 'Dummy',
          },
        },
      ],
      meta: {
        pagination: {
          pageCount: 1,
        },
      },
    });
  } else {
    res.status(404).send(`${req.method} /posts not found.`);
  }
}
