import express from 'express';
import Content from '../models/Content.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get all content by type
router.get('/:type', async (req, res) => {
  try {
    const content = await Content.find({ type: req.params.type })
      .populate('authorId')
      .sort({ order: 1, createdAt: -1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single content by ID
router.get('/item/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate('authorId');
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new content
router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const contentData = { ...req.body };
    
    if (req.files?.image) {
      contentData.image = '/uploads/' + req.files.image[0].filename;
    }
    if (req.files?.video) {
      contentData.video = '/uploads/' + req.files.video[0].filename;
    }
    
    const content = new Content(contentData);
    const savedContent = await content.save();
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update content
router.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const contentData = { ...req.body };
    
    if (req.files?.image) {
      contentData.image = '/uploads/' + req.files.image[0].filename;
    }
    if (req.files?.video) {
      contentData.video = '/uploads/' + req.files.video[0].filename;
    }
    
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      contentData,
      { new: true }
    );
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete content
router.delete('/:id', async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: 'Content deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
