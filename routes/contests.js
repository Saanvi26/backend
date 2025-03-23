// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// const CODEFORCES_API_URL = 'https://codeforces.com/api';

// router.get('/contests', async (req, res) => {
//   const username = process.env.CODEFORCES_USERNAME || 'your_handle';

//   try {
//     const contestRes = await axios.get(`${CODEFORCES_API_URL}/contest.list?gym=false`);
//     const contests = contestRes.data.result;

//     const userRes = await axios.get(`${CODEFORCES_API_URL}/user.rating?handle=${username}`);
//     const userHistory = userRes.data.result;

//     const participationMap = {};
//     userHistory.forEach((contest) => {
//       participationMap[contest.contestId] = {
//         participated: true,
//         rank: contest.rank,
//         oldRating: contest.oldRating,
//         newRating: contest.newRating,
//         date: new Date(contest.ratingUpdateTimeSeconds * 1000).toISOString().split('T')[0],
//       };
//     });

//     const combinedData = contests.map((contest) => {
//       const participation = participationMap[contest.id] || {
//         participated: false,
//       };

//       return {
//         id: contest.id,
//         name: contest.name,
//         platform: 'codeforces',
//         date: new Date(contest.startTimeSeconds * 1000).toISOString().split('T')[0],
//         duration: contest.durationSeconds / 3600, // In hours
//         participated: participation.participated,
//         rank: participation.rank || null,
//         oldRating: participation.oldRating || null,
//         newRating: participation.newRating || null,
//       };
//     });

//     res.json(combinedData);
//   } catch (error) {
//     console.error('Failed to fetch contests:', error.message);
//     res.status(500).json({ error: 'Failed to fetch contests' });
//   }
// });

// module.exports = router;

const express = require("express");
const { getContests } = require("./contestsController");

const router = express.Router();

router.get("/contests", getContests);

module.exports = router;

