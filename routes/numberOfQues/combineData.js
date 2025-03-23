const fetchLeetcodeDailyData = require('./leetcode');
const fetchCodeforcesDailyData = require('./codeforces');
const fetchCodechefDailyData = require('./codechef');

const combineData = async () => {
  const [leetcode, codeforces, codechef] = await Promise.all([
    fetchLeetcodeDailyData(),
    fetchCodeforcesDailyData(),
    fetchCodechefDailyData()
  ]);

  const combined = [];

  const dateMap = {};

  leetcode.forEach(item => {
    dateMap[item.date] = { date: item.date, leetcode: item.solved || 0, codeforces: 0, codechef: 0 };
  });

  codeforces.forEach(item => {
    if (dateMap[item.date]) {
      dateMap[item.date].codeforces = item.solved || 0;
    } else {
      dateMap[item.date] = { date: item.date, leetcode: 0, codeforces: item.solved || 0, codechef: 0 };
    }
  });

  codechef.forEach(item => {
    if (dateMap[item.date]) {
      dateMap[item.date].codechef = item.codechef || 0;
    } else {
      dateMap[item.date] = { date: item.date, leetcode: 0, codeforces: 0, codechef: item.codechef || 0 };
    }
  });

  // Sort by date
  Object.values(dateMap).sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(data => {
    combined.push(data);
  });

  return combined;
};

module.exports = combineData;
