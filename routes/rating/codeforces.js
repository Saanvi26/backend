const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const CODEFORCES_USERNAME = process.env.CODEFORCES_USERNAME;

const fetchCodeforcesRatings = async () => {
  try {
    const res = await axios.get(`https://codeforces.com/api/user.rating?handle=${CODEFORCES_USERNAME}`);
    const contests = res.data.result;

    return contests.map((contest) => ({
      date: new Date(contest.ratingUpdateTimeSeconds * 1000).toISOString().split('T')[0],
      rating: contest.newRating
    }));
  } catch (error) {
    console.error('Failed to fetch Codeforces ratings:', error.message);
    return [];
  }
};

module.exports = { fetchCodeforcesRatings };
