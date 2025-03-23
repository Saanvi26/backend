const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const fillMissingDates = require('../../utils/fillMissingDates');

dotenv.config();

const fetchCodechefDailyData = async () => {
  const username = process.env.CODECHEF_USERNAME;

  try {
    const response = await axios.get(`https://www.codechef.com/users/${username}`);
    const $ = cheerio.load(response.data);

    const submissions = [];

    $('.recent-activity a').each((_, element) => {
      const text = $(element).text().trim();
      const dateAttr = $(element).parent().find('time').attr('datetime');

      if (dateAttr) {
        const date = new Date(dateAttr).toISOString().split('T')[0];
        submissions.push({ date });
      }
    });

    const dailyCount = submissions.reduce((acc, { date }) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const dailyData = Object.entries(dailyCount).map(([date, solved]) => ({
      date,
      solved
    }));

    return fillMissingDates(dailyData);

  } catch (error) {
    console.error('Error fetching CodeChef data:', error.message);
    return [];
  }
};

module.exports = fetchCodechefDailyData;
