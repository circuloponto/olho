import connectDB from '../../lib/mongodb.js';
import Content from '../../lib/Content.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    await connectDB();

    if (req.method === 'GET') {
      const content = await Content.findById(id).populate('authorId');
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      return res.status(200).json(content);
    }

    if (req.method === 'PUT') {
      const content = await Content.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(content);
    }

    if (req.method === 'DELETE') {
      await Content.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Content deleted' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: error.message });
  }
}
