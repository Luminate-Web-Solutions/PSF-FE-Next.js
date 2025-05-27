const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const VerticalGallery = require('../models/verticalGallery');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/gallery/'), // make sure uploads folder exists
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// GET all galleries (or single gallery if needed)
router.get('/', async (req, res) => {
  try {
    const galleries = await VerticalGallery.findAll();
    res.json(galleries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch galleries' });
  }
});

// POST create new gallery with multiple images
router.post('/', upload.array('images', 100), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    const gallery = await VerticalGallery.create({ images: imagePaths });
    res.status(201).json(gallery);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create gallery' });
  }
});

// PUT update gallery images (replace all)
router.put('/:id', upload.array('images', 100), async (req, res) => {
  try {
    const gallery = await VerticalGallery.findByPk(req.params.id);
    if (!gallery) return res.status(404).json({ error: 'Gallery not found' });

    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    gallery.images = imagePaths;
    await gallery.save();
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update gallery' });
  }
});

// DELETE gallery
router.delete('/:id', async (req, res) => {
  try {
    const gallery = await VerticalGallery.findByPk(req.params.id);
    if (!gallery) return res.status(404).json({ error: 'Gallery not found' });

    await gallery.destroy();
    res.json({ message: 'Gallery deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete gallery' });
  }
});

module.exports = router;
