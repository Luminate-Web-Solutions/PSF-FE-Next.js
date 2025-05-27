const express = require("express");
const Newsletter = require("../models/newsletter.js");
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/newsletter/'); // Organized by verticals
  },
  filename: function (req, file, cb) {
    // Unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
const router = express.Router();


//get 
router.get("/", async (req, res) => {
  try {
    const newsletter = await Newsletter.findAll();
    res.status(200).json(newsletter);
  } catch (error) {
    console.error("Error fetching Newsletter data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//create a Newsletter message
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const {
      title,
      file
    } = req.body;

    const newNewsletter = await Newsletter.create({
      title,
      file: req.file?.path || null, 
    });

    res.status(201).json(newNewsletter);
  } catch (error) {
    console.error("Error creating Newsletter data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//update a Newsletter message
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    // Build update object
    const updateData = { title };
    if (req.file) {
      updateData.file = req.file.path;  // Add path only if file is uploaded
    }

    const [updatedRows] = await Newsletter.update(updateData, {
      where: { id }
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Newsletter not found" });
    }

    res.status(200).json({ message: "Newsletter updated successfully" });
  } catch (error) {
    console.error("Error updating Newsletter data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//delete a Newsletter message
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNewsletter = await Newsletter.destroy({ where: { id } });

    if (deletedNewsletter === 0) {
      return res.status(404).json({ error: "Newsletter not found" });
    }

    res.status(200).json({ message: "Newsletter deleted successfully" });
  } catch (error) {
    console.error("Error deleting Newsletter data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
