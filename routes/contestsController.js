const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME;
const CODEFORCES_HANDLE = process.env.CODEFORCES_HANDLE;
const CODECHEF_USERNAME = process.env.CODECHEF_USERNAME;

const getLeetCodeContests = async () => {
  const url = `https://leetcode.com/graphql`;
  
  const query = {
    query: `
      query {
        userContestRankingHistory(username: "${LEETCODE_USERNAME}") {
          contest {
            title
            startTime
          }
          ranking
          rating
        }
      }
    `,
  };

  try {
    const response = await axios.post(url, query);
    const contests = response.data.data.userContestRankingHistory || [];

    return contests.map((contest, index) => ({
      id: `lc-${index + 1}`,
      platform: "LeetCode",
      name: contest.contest.title,
      date: new Date(contest.contest.startTime * 1000).toISOString().split("T")[0],
      participated: contest.ranking !== null,
      rank: contest.ranking || null,
      rating: contest.rating || null
    }));
  } catch (error) {
    console.error("Error fetching LeetCode contests:", error.message);
    return [];
  }
};

const getCodeforcesContests = async () => {
  const url = `https://codeforces.com/api/user.rating?handle=${CODEFORCES_HANDLE}`;

  try {
    const response = await axios.get(url);
    const contests = response.data.result || [];

    return contests.map((contest, index) => ({
      id: `cf-${index + 1}`,
      platform: "Codeforces",
      name: contest.contestName,
      date: new Date(contest.ratingUpdateTimeSeconds * 1000).toISOString().split("T")[0],
      participated: true,
      rank: contest.rank,
      rating: contest.newRating
    }));
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error.message);
    return [];
  }
};

const getCodeChefContests = async () => {
  const url = `https://www.codechef.com/users/${CODECHEF_USERNAME}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const contestRegex = /<li>(.*?)<\/li>/g;
    const rankRegex = /Rank: (\d+)/;
    const ratingRegex = /Rating: (\d+)/;

    const contests = [];
    let match;

    while ((match = contestRegex.exec(data)) !== null) {
      const contestName = match[1].replace(/<\/?[^>]+(>|$)/g, "").trim();
      const date = "2025-03-01"; // Mock date (CodeChef doesn't provide exact contest dates)
      const rankMatch = data.match(rankRegex);
      const ratingMatch = data.match(ratingRegex);

      contests.push({
        id: `cc-${contests.length + 1}`,
        platform: "CodeChef",
        name: contestName,
        date,
        participated: rankMatch !== null,
        rank: rankMatch ? parseInt(rankMatch[1]) : null,
        rating: ratingMatch ? parseInt(ratingMatch[1]) : null
      });
    }

    return contests;
  } catch (error) {
    console.error("Error fetching CodeChef contests:", error.message);
    return [];
  }
};

const getContests = async (req, res) => {
  try {
    const [leetCodeData, codeforcesData, codechefData] = await Promise.all([
      getLeetCodeContests(),
      getCodeforcesContests(),
      getCodeChefContests()
    ]);

    const allContests = [
      ...leetCodeData,
      ...codeforcesData,
      ...codechefData
    ];

    res.status(200).json(allContests);
  } catch (error) {
    console.error("Error fetching all contests:", error.message);
    res.status(500).json({ message: "Failed to fetch contests" });
  }
};

module.exports = { getContests };
