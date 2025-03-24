const axios = require("axios");

const API_URL = "https://api.digitomize.com/contests";
const ALLOWED_SITES = ["leetcode", "codechef", "codeforces"];

async function fetchUpcomingContests() {
  try {
    const response = await axios.get(API_URL);
    if (
      response.status === 200 &&
      response.data.results &&
      Array.isArray(response.data.results)
    ) {
      const today = new Date().setHours(0, 0, 0, 0) / 1000;
      const contests = response.data.results.filter((contest) => {
        const contestDate =
          new Date(contest.startTimeUnix * 1000).setHours(0, 0, 0, 0) / 1000;
        return (
          ALLOWED_SITES.includes(contest.host.toLowerCase()) &&
          contestDate >= today
        );
      });
      console.log(JSON.stringify(contests, null, 2));
      return contests;
    } else {
      console.error("Unexpected response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching contests:", error.message);
    return [];
  }
}
