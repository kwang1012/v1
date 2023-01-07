export default async function handler(req, res) {
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
