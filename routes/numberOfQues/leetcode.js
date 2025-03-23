const axios = require('axios');
const dotenv = require('dotenv');
const fillMissingDates = require('../../utils/fillMissingDates');

dotenv.config();

const fetchLeetCodeDailyData = async () => {
  const username = process.env.LEETCODE_USERNAME;

  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submissionCalendar
          }
        }
      `,
      variables: { username }
    });

    const calendar = JSON.parse(response.data.data.matchedUser.submissionCalendar);

    const dailyData = Object.entries(calendar).map(([timestamp, count]) => ({
      date: new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0],
      solved: count
    }));

    return fillMissingDates(dailyData);

  } catch (error) {
    console.error('Error fetching LeetCode data:', error.message);
    return [];
  }
};

module.exports = fetchLeetCodeDailyData;
