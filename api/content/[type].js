import connectDB from '../lib/mongodb.js';
import Content from '../lib/Content.js';

export default async function handler(req, res) {
  const { type } = req.query;

  await connectDB();

  if (req.method === 'GET') {
    try {
      const content = await Content.find({ type })
        .populate('authorId')
        .sort({ order: 1, createdAt: -1 });
      return res.status(200).json(content);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
