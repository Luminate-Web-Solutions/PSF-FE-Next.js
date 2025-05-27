const express = require('express');
const router = express.Router();
const Admin = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  console.log(emailId,password)

  try {
    const admin = await Admin.findOne({ where: { emailId } });
    if (!admin) {
      console.log("Admin not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin.id }, "yourSuperSecretKey", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
