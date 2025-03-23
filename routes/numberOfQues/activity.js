
const express = require('express');
const combineData = require('./combineData');
const router = express.Router();

router.get('/questions', async (req, res) => {
  try {
    const data = await combineData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ error: 'Failed to fetch activity data' });
  }
});

module.exports = router;

