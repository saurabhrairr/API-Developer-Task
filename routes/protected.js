const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const Form = require("../models/Form");

router.get("/alldataget", authMiddleware, async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "This is a protected route", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/datapost", authMiddleware, async (req, res) => {
  try {
    const { name, age, salary, designation } = req.body;
    const user = new Form({ name, age, salary, designation });
    await user.save();
    if (!user) {
      res.status(500).json({ error: err.message });
    }
    res.status(200).json({ user: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.put("/datapost/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params; // Extract id from req.params
      const { name, age, salary, designation } = req.body;
  
      const user = await Form.findByIdAndUpdate(id, { name, age, salary, designation }, { new: true });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ user: user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

  

router.get("/datepost", authMiddleware, async (req, res) => {
  try {
    const user = await Form.find();
    if (!user) {
      res.status(404).send(err.message);
    }
    res.json({ message: "This is a protected route", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




router.get('/weather',authMiddleware,  async (req, res) => {
    try {
      const { city, apiKey } = req.query;
      if (!city || !apiKey) {
        return res.status(400).json({ error: 'City and API key are required' });
      }
  
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
      res.json(weatherData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
