import connectDB from '../../lib/mongodb.js';
import Content from '../../lib/Content.js';

export default async function handler(req, res) {
  const { id } = req.query;

  await connectDB();

  if (req.method === 'GET') {
    try {
      const content = await Content.findById(id).populate('authorId');
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      return res.status(200).json(content);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const content = await Content.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(content);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await Content.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Content deleted' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
