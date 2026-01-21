import connectDB from '../lib/mongodb.js';
import Content from '../lib/Content.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { type } = req.query;

  try {
    await connectDB();

    if (req.method === 'GET') {
      const content = await Content.find({ type })
        .populate('authorId')
        .sort({ order: 1, createdAt: -1 });
      return res.status(200).json(content);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
}
