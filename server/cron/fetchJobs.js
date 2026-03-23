const cron = require("node-cron");
const axios = require("axios");
const Job = require("../models/Job");

const DOMAINS = [
  "Software Development Engineer",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Cloud Computing",
  "Cybersecurity",
];

const DOMAIN_MAP = {
  "Software Development Engineer": "SDE",
  "Data Science": "Data Science",
  "Machine Learning": "ML",
  "Artificial Intelligence": "AI",
  "Cloud Computing": "Cloud Computing",
  Cybersecurity: "Cybersecurity",
};

async function fetchJobsForDomain(queryString, domainLabel) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST || "jsearch.p.rapidapi.com";

  if (!apiKey || apiKey === "your_rapidapi_key_here") {
    console.log(`⏭️  Skipping fetch for "${domainLabel}" — no API key configured`);
    return 0;
  }

  let totalUpserted = 0;

  try {
    // Fetch up to 50 results (5 pages × 10 per page)
    for (let page = 1; page <= 5; page++) {
      const { data } = await axios.get("https://jsearch.p.rapidapi.com/search", {
        params: {
          query: queryString,
          page: page.toString(),
          num_pages: "1",
          date_posted: "month",
        },
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": apiHost,
        },
      });

      if (!data?.data?.length) break;

      for (const job of data.data) {
        await Job.findOneAndUpdate(
          { job_id: job.job_id },
          {
            job_id: job.job_id,
            employer_name: job.employer_name || "Unknown",
            employer_logo: job.employer_logo || null,
            job_title: job.job_title,
            domain: domainLabel,
            job_employment_type: job.job_employment_type || "FULLTIME",
            job_is_remote: job.job_is_remote || false,
            job_apply_link:
              job.job_apply_link ||
              (job.apply_options && job.apply_options[0]?.apply_link) ||
              "#",
            job_description: job.job_description || "",
            job_city: job.job_city || "",
            job_state: job.job_state || "",
            job_country: job.job_country || "",
            job_posted_at_datetime_utc:
              job.job_posted_at_datetime_utc || new Date(),
          },
          { upsert: true, new: true }
        );
        totalUpserted++;
      }
    }

    console.log(`✅ ${domainLabel}: upserted ${totalUpserted} jobs`);
  } catch (err) {
    console.error(`❌ Error fetching "${domainLabel}":`, err.message);
  }

  return totalUpserted;
}

async function runFetchAll() {
  console.log("🔄 Cron: starting job fetch for all domains...");
  let total = 0;

  for (const queryString of DOMAINS) {
    const label = DOMAIN_MAP[queryString];
    const count = await fetchJobsForDomain(queryString, label);
    total += count;
  }

  console.log(`🔄 Cron: finished — ${total} jobs upserted across all domains`);
}

function startCron() {
  // Run twice daily at 00:00 and 12:00
  cron.schedule("0 0,12 * * *", () => {
    runFetchAll();
  });
  console.log("⏰ Cron scheduler started (runs at 00:00 & 12:00)");
}

module.exports = { startCron, runNow: runFetchAll };
