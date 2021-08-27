export default function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body)
        res.status(200).send('success');
    }
    else {
        res.status(404).send(`${req.method} /message not found.`)
    }
}