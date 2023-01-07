export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).send(1);
  } else {
    res.status(404).send(`${req.method} /comments not found.`);
  }
}
