const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const CODECHEF_USERNAME = process.env.CODECHEF_USERNAME;

const fetchCodeChefRatings = async () => {
  try {
    const res = await axios.get(`https://www.codechef.com/users/${CODECHEF_USERNAME}`);
    
    const contests = res.data?.contest_ratings || [];

    return contests.map((contest) => ({
      date: contest.contest_code,
      rating: contest.rating
    }));
  } catch (error) {
    console.error('Failed to fetch CodeChef ratings:', error.message);
    return [];
  }
};

module.exports = { fetchCodeChefRatings };
