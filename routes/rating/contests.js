const express = require('express');
const router = express.Router();
const { fetchLeetCodeRatings } = require('./leetcode');
const { fetchCodeforcesRatings } = require('./codeforces');
const { fetchCodeChefRatings } = require('./codechef');

router.get('/ratings', async (req, res) => {
  try {
    const leetcodeData = await fetchLeetCodeRatings();
    const codeforcesData = await fetchCodeforcesRatings();
    const codechefData = await fetchCodeChefRatings();

    const allDates = new Set([
      ...leetcodeData.map((r) => r.date),
      ...codeforcesData.map((r) => r.date),
      ...codechefData.map((r) => r.date)
    ]);

    const combinedData = Array.from(allDates).map((date) => {
      const lc = leetcodeData.find((r) => r.date === date);
      const cf = codeforcesData.find((r) => r.date === date);
      const cc = codechefData.find((r) => r.date === date);

      return {
        date,
        leetcode: lc ? lc.rating : null,
        codeforces: cf ? cf.rating : null,
        codechef: cc ? cc.rating : null
      };
    });

    combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ error: 'Failed to fetch rating data' });
  }
});

module.exports = router;
