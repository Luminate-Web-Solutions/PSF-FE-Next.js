import { query } from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/events');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'event-' + uniqueSuffix + ext);
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Set up multer upload
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
  fileFilter: fileFilter
});

// Get all events
export const getAllEvents = async (req, res, next) => {
  try {
    const events = await query(`
      SELECT id, name, description, date, image, created_at, updated_at 
      FROM events 
      ORDER BY date DESC
    `);
    
    // Format the response - IMPORTANT: Fix the image URL path
    const formattedEvents = events.map(event => ({
      id: event.id,
      name: event.name,
      description: event.description,
      date: event.date,
      // Fix the image URL to use the correct path
      image: event.image ? `${req.protocol}://${req.get('host')}/uploads/events/${event.image}` : null,
      createdAt: event.created_at,
      updatedAt: event.updated_at
    }));
    
    res.status(200).json(formattedEvents);
  } catch (error) {
    console.error('Error in getAllEvents:', error);
    next(error);
  }
};

// Get event by ID
export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const events = await query('SELECT * FROM events WHERE id = ?', [id]);
    
    if (events.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const event = events[0];
    
    // Format the response - IMPORTANT: Fix the image URL path
    const formattedEvent = {
      id: event.id,
      name: event.name,
      description: event.description,
      date: event.date,
      // Fix the image URL to use the correct path
      image: event.image ? `${req.protocol}://${req.get('host')}/uploads/events/${event.image}` : null,
      createdAt: event.created_at,
      updatedAt: event.updated_at
    };
    
    res.status(200).json(formattedEvent);
  } catch (error) {
    console.error('Error in getEventById:', error);
    next(error);
  }
};

// Create new event
export const createEvent = async (req, res, next) => {
  try {
    const { name, description, date } = req.body;
    
    // Validate required fields
    if (!name || !description || !date) {
      return res.status(400).json({ message: 'Name, description, and date are required' });
    }
    
    let imagePath = null;
    
    // If file was uploaded
    if (req.file) {
      imagePath = req.file.filename;
    }
    
    // Insert event into database
    const result = await query(
      'INSERT INTO events (name, description, date, image) VALUES (?, ?, ?, ?)',
      [name, description, new Date(date), imagePath]
    );
    
    res.status(201).json({
      id: result.insertId,
      name,
      description,
      date,
      // Fix the image URL to use the correct path
      image: imagePath ? `${req.protocol}://${req.get('host')}/uploads/events/${imagePath}` : null
    });
  } catch (error) {
    console.error('Error in createEvent:', error);
    next(error);
  }
};

// Update event
export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, date } = req.body;
    
    // Check if event exists
    const events = await query('SELECT * FROM events WHERE id = ?', [id]);
    
    if (events.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const event = events[0];
    let imagePath = event.image;
    
    // If new file was uploaded
    if (req.file) {
      // Delete old image if exists
      if (event.image) {
        const oldImagePath = path.join(__dirname, '../uploads/events', event.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      imagePath = req.file.filename;
    }
    
    // Update event in database
    await query(
      'UPDATE events SET name = ?, description = ?, date = ?, image = ?, updated_at = NOW() WHERE id = ?',
      [name, description, new Date(date), imagePath, id]
    );
    
    res.status(200).json({
      id: parseInt(id),
      name,
      description,
      date,
      // Fix the image URL to use the correct path
      image: imagePath ? `${req.protocol}://${req.get('host')}/uploads/events/${imagePath}` : null
    });
  } catch (error) {
    console.error('Error in updateEvent:', error);
    next(error);
  }
};

// Delete event
export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if event exists
    const events = await query('SELECT * FROM events WHERE id = ?', [id]);
    
    if (events.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const event = events[0];
    
    // Delete image if exists
    if (event.image) {
      const imagePath = path.join(__dirname, '../uploads/events', event.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    // Delete event from database
    await query('DELETE FROM events WHERE id = ?', [id]);
    
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error in deleteEvent:', error);
    next(error);
  }
};