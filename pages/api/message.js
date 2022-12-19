import connectDB from "middleware/mongodb";
import { Message } from "models";

async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        if (name && email && message) {
            try {
                const msg = new Message({
                    name,
                    email,
                    message
                });
                const msgCreated = await msg.save();
                res.status(201).send(msgCreated);
            } catch (err) {
                res.status(500).send(err.message);
            }
        }
        else {
            res.status(400).send('Bad Request');
        }
    }
    else {
        res.status(404).send(`${req.method} /message not found.`);
    }
}

export default connectDB(handler);