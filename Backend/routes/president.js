const express = require("express");
const President = require("../models/president.js");
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/president/'); // Organized by verticals
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
    const president = await President.findAll();
    res.status(200).json(president);
  } catch (error) {
    console.error("Error fetching president data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//create a president message
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      image,
      description1,
      description2,
      description3,
      description4,
    } = req.body;

    const newPresident = await President.create({
      title,
      image,
      description1,
      description2,
      description3,
      description4,
    });

    res.status(201).json(newPresident);
  } catch (error) {
    console.error("Error creating president data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//update a president message
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      image,
      description1,
      description2,
      description3,
      description4,
    } = req.body;

    const updatedPresident = await President.update(
      {
        title,
        image,
        description1,
        description2,
        description3,
        description4,
      },
      { where: { id } }
    );

    if (updatedPresident[0] === 0) {
      return res.status(404).json({ error: "President not found" });
    }

    res.status(200).json({ message: "President updated successfully" });
  } catch (error) {
    console.error("Error updating president data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete a president message
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPresident = await President.destroy({ where: { id } });

    if (deletedPresident === 0) {
      return res.status(404).json({ error: "President not found" });
    }

    res.status(200).json({ message: "President deleted successfully" });
  } catch (error) {
    console.error("Error deleting president data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
