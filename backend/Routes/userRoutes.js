const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'Lax'
};

router.post('/register', async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ userName, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, 'key', { expiresIn: '1h' });
        res.cookie('token', token, cookieOptions);
        return res.json({ message: "Logged in successfully", success: "true", token });
    } else {
        return res.status(400).json({ error: 'Invalid Credentials' });
    }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error, please try again later.' });
  }
});

router.get('/profile/accepted-projects', async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const acceptedProjects = user.projects.filter(project => project.status === 'accepted');

    res.status(200).json({ acceptedProjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch accepted projects' });
  }
});

module.exports = router;
