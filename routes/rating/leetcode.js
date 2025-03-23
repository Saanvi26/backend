const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME;

const fetchLeetCodeRatings = async () => {
  try {
    const res = await axios.post('https://leetcode.com/graphql', {
      query: `
        query {
          userContestRankingHistory(username: "${LEETCODE_USERNAME}") {
            rating
            contest {
              startTime
            }
          }
        }
      `
    });

    const ratings = res.data.data.userContestRankingHistory || [];

    return ratings.map((entry) => ({
      date: new Date(entry.contest.startTime * 1000).toISOString().split('T')[0],
      rating: Math.round(entry.rating)
    }));
  } catch (error) {
    console.error('Failed to fetch LeetCode ratings:', error.message);
    return [];
  }
};

module.exports = { fetchLeetCodeRatings };
