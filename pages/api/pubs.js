import connectDB from 'middleware/mongodb';
import { Publication } from 'models';

export const getPubs = connectDB(async () => {
  const pubs = await Publication.find();
  return JSON.parse(JSON.stringify(pubs))
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const pubs = await getPubs();
    res.status(200).send(pubs);
  } else {
    res.status(404).send(`${req.method} /pubs not found.`);
  }
}
