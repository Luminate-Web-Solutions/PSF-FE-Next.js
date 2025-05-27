const express = require("express");
const { Team, TeamMember } = require("../models/team");
const path = require("path");
const multer = require("multer");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/team/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Team routes
router.get("/", async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [TeamMember],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, subTitle, description } = req.body;
    const newTeam = await Team.create({ title, subTitle, description });
    res.status(201).json(newTeam);
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subTitle, description } = req.body;

    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    await team.update({ title, subTitle, description });
    res.status(200).json(team);
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Delete all members first
    await TeamMember.destroy({ where: { TeamId: id } });
    await team.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Team member routes
router.post("/:teamId/members", upload.single("image"), async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, role } = req.body;
    const image = req.file ? req.file.path : null;

    const team = await Team.findByPk(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const newMember = await TeamMember.create({
      name,
      role,
      image,
      TeamId: teamId,
    });

    res.status(201).json(newMember);
  } catch (error) {
    console.error("Error creating team member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put(
  "/:teamId/members/:memberId",
  upload.single("image"),
  async (req, res) => {
    try {
      const { teamId, memberId } = req.params;
      const { name, role } = req.body;
      const image = req.file ? req.file.path : null;

      const member = await TeamMember.findOne({
        where: {
          id: memberId,
          TeamId: teamId,
        },
      });

      if (!member) {
        return res.status(404).json({ error: "Member not found" });
      }

      const updateData = { name, role };
      if (image) updateData.image = image;

      await member.update(updateData);
      res.status(200).json(member);
    } catch (error) {
      console.error("Error updating team member:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete("/:teamId/members/:memberId", async (req, res) => {
  try {
    const { teamId, memberId } = req.params;

    const member = await TeamMember.findOne({
      where: {
        id: memberId,
        TeamId: teamId,
      },
    });

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    await member.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting team member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
