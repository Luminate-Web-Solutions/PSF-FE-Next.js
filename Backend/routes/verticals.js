const express =  require('express');
const Verticals = require('../models/verticals.js');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/verticals/'); // Organized by verticals
  },
  filename: function (req, file, cb) {
    // Unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

//get all verticals
router.get('/', async (req, res) => {
  try {
    const verticals = await Verticals.findAll();
    res.status(200).json(verticals);
  } catch (error) {
    console.error('Error fetching verticals data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//create a new vertical
router.post('/', upload.fields([{ name: 'image1' }, { name: 'image2' }, {name:'image3'},{name:'image4'},{name:'image5'}]), async (req, res) => {
  try {
    const { title, subtitle1, description1, subtitle2, description2, subtitle3, description3, subtitle4, description4, subtitle5, description5 } = req.body;
    
    // Get file paths from uploaded files
    const image1 = req.files?.image1?.[0]?.path || null;
    const image2 = req.files?.image2?.[0]?.path || null;
    const image3 = req.files?.image3?.[0]?.path || null;
    const image4 = req.files?.image4?.[0]?.path || null;
    const image5 = req.files?.image5?.[0]?.path || null;

    const newVertical = await Verticals.create({
      title,
      image1,
      subtitle1,
      description1,
      image2,
      subtitle2,
      description2,
      image3,
      subtitle3,
      description3,
      image4,
      subtitle4,
      description4,
      image5,
      subtitle5,
      description5
    });

    res.status(201).json(newVertical);
  } catch (error) {
    console.error('Error creating vertical:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// In your Express backend
router.get('/api/verticals/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const vertical = await Verticals.findOne({ where: { title } });
    if (!vertical) return res.status(404).json({ message: 'Vertical not found' });
    res.json(vertical);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


//update data
router.put('/:id', upload.fields([
  { name: 'image1' }, 
  { name: 'image2' },
  { name: 'image3' },
  { name: 'image4' },
  { name: 'image5' }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      subtitle1, description1,
      subtitle2, description2,
      subtitle3, description3,
      subtitle4, description4,
      subtitle5, description5
    } = req.body;

    // Get updated file paths (if new files were uploaded)
    const updateData = {
      title,
      subtitle1, description1,
      subtitle2, description2,
      subtitle3, description3,
      subtitle4, description4,
      subtitle5, description5
    };

    // Only update image fields if new files were uploaded
    if (req.files?.image1) updateData.image1 = req.files.image1[0].path;
    if (req.files?.image2) updateData.image2 = req.files.image2[0].path;
    if (req.files?.image3) updateData.image3 = req.files.image3[0].path;
    if (req.files?.image4) updateData.image4 = req.files.image4[0].path;
    if (req.files?.image5) updateData.image5 = req.files.image5[0].path;

    const updatedVertical = await Verticals.update(updateData, { where: { id } });

    if (updatedVertical[0] === 0) {
      return res.status(404).json({ error: 'Vertical not found' });
    }

    res.status(200).json({ message: 'Vertical updated successfully' });
  } catch (error) {
    console.error('Error updating vertical:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//delete a vertical
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVertical = await Verticals.destroy({
      where: { id },
    });

    if (deletedVertical === 0) {
      return res.status(404).json({ error: 'Vertical not found' });
    }

    res.status(200).json({ message: 'Vertical deleted successfully' });
  } catch (error) {
    console.error('Error deleting vertical:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;