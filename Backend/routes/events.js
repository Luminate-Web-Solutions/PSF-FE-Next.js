const express = require('express');
const { Event } = require('../models/event.js'); // Ensure correct import
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/events/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const router = express.Router();

// ✅ Count events for dashboard
router.get('/count', async (req, res) => {
  try {
    const totalEvents = await Event.count();
    const upcomingEvents = await Event.count({ where: { status: 'upcoming' } });
    const ongoingEvents = await Event.count({ where: { status: 'ongoing' } });
    const completedEvents = await Event.count({ where: { status: 'completed' } });

    res.status(200).json({
      totalEvents,
      upcomingEvents,
      ongoingEvents,
      completedEvents
    });
  } catch (error) {
    console.error('Error counting events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [['date', 'DESC']]
    });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Get a single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Create event
router.post('/', upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'images', maxCount: 15 }
]), async (req, res) => {
  try {
    const {
      name, subtitle1, subtitle2, description1, description2,
      date, time, status, category, location, isFeatured
    } = req.body;

    const heroImage = req.files?.heroImage?.[0]?.path || null;
    const images = req.files?.images ? req.files.images.map(file => file.path) : [];

    const newEvent = await Event.create({
      name,
      heroImage,
      subtitle1,
      subtitle2,
      description1,
      description2,
      images,
      date,
      time,
      status,
      category,
      location,
      isFeatured: isFeatured === 'true' || isFeatured === true // handle string/bool
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error.message || error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// ✅ Update event
router.put('/:id', upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'images', maxCount: 15 }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const {
      name, subtitle1, subtitle2, description1, description2,
      date, time, status, category, location, isFeatured
    } = req.body;

    const updateData = {
      name,
      subtitle1,
      subtitle2,
      description1,
      description2,
      date,
      time,
      status,
      category,
      location,
      isFeatured: isFeatured === 'true' || isFeatured === true
    };

    if (req.files?.heroImage) {
      updateData.heroImage = req.files.heroImage[0].path;
    }

    if (req.files?.images) {
      const newImages = req.files.images.map(file => file.path);
      const existingImages = event.images || [];
      updateData.images = [...existingImages, ...newImages];
    }

    await event.update(updateData);
    res.status(200).json(event);
  } catch (error) {
    console.error('Error updating event:', error.message || error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// ✅ Delete event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting event:', error.message || error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
