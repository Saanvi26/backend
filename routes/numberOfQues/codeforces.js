const axios = require('axios');
const dotenv = require('dotenv');
const fillMissingDates = require('../../utils/fillMissingDates');

dotenv.config();

const fetchCodeforcesDailyData = async () => {
  const handle = process.env.CODEFORCES_HANDLE;

  try {
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
    
    if (!response.data || !response.data.result || response.data.result.length === 0) {
      console.log('No submissions found for Codeforces');
      return fillMissingDates([]);  
    }

    const submissions = response.data.result;

    const dailyCount = {};

    submissions.forEach(sub => {
      if (sub.verdict === 'OK') {
        const date = new Date(sub.creationTimeSeconds * 1000).toISOString().split('T')[0];
        dailyCount[date] = (dailyCount[date] || 0) + 1;
      }
    });

    const dailyData = Object.entries(dailyCount).map(([date, count]) => ({
      date,
      solved: count
    }));

    return fillMissingDates(dailyData);

  } catch (error) {
    console.error('Error fetching Codeforces data:', error.message);
    return fillMissingDates([]);  
  }
};

module.exports = fetchCodeforcesDailyData;
