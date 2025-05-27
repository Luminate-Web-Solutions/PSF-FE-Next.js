const express = require('express');
const Events = require('../models/event.js');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/events/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Count events for dashboard
router.get('/count', async (req, res) => {
  try {
    const totalEvents = await Events.count();
    const upcomingEvents = await Events.count({ where: { status: 'upcoming' } });
    const ongoingEvents = await Events.count({ where: { status: 'ongoing' } });
    const completedEvents = await Events.count({ where: { status: 'completed' } });
    
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

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Events.findAll({
      order: [['date', 'DESC']] // Sort by date descending
    });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single event
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Events.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create event
router.post('/', upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), async (req, res) => {
  try {
    const { 
      name,
      subtitle1,
      subtitle2,
      description1,
      description2,
      date,
      time,
      status
    } = req.body;

    const heroImage = req.files?.heroImage?.[0]?.path || null;
    const images = req.files?.images ? req.files.images.map(file => file.path) : [];

    const newEvent = await Events.create({
      name,
      heroImage,
      subtitle1,
      subtitle2,
      description1,
      description2,
      image: images.length > 0 ? JSON.stringify(images) : null,
      date,
      time,
      status
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update event
router.put('/:id', upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name,
      subtitle1,
      subtitle2,
      description1,
      description2,
      date,
      time,
      status
    } = req.body;

    const event = await Events.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const updateData = {
      name,
      subtitle1,
      subtitle2,
      description1,
      description2,
      date,
      time,
      status
    };

    // Handle file updates
    if (req.files?.heroImage) {
      updateData.heroImage = req.files.heroImage[0].path;
    }
    
    if (req.files?.images) {
      const newImages = req.files.images.map(file => file.path);
      const existingImages = event.image ? JSON.parse(event.image) : [];
      updateData.image = JSON.stringify([...existingImages, ...newImages]);
    }

    await event.update(updateData);
    res.status(200).json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Events.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;