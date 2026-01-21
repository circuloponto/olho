import connectDB from '../lib/mongodb.js';
import Content from '../lib/Content.js';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const content = new Content(req.body);
      const savedContent = await content.save();
      return res.status(201).json(savedContent);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
