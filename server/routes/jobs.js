const express = require("express");
const Job = require("../models/Job");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/jobs?domain=...&type=...&remote=...&page=1
router.get("/", auth, async (req, res) => {
  try {
    const { domain, type, remote, page = 1, limit = 20 } = req.query;

    const filter = {};

    // Domain filter
    if (domain && domain !== "all") {
      filter.domain = domain;
    }

    // Employment type filter
    if (type === "internship") {
      filter.job_employment_type = "INTERN";
    } else if (type === "fulltime") {
      filter.job_employment_type = "FULLTIME";
    } else if (type === "parttime") {
      filter.job_employment_type = "PARTTIME";
    } else if (type === "contract") {
      filter.job_employment_type = "CONTRACTOR";
    }
    // If type is "all" or not provided, no employment type filter

    // Remote filter
    if (remote === "true") {
      filter.job_is_remote = true;
    }

    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 20;

    const skip = (parsedPage - 1) * parsedLimit;

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .sort({ job_posted_at_datetime_utc: -1 })
        .skip(skip)
        .limit(parsedLimit),
      Job.countDocuments(filter),
    ]);

    res.json({
      jobs,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        total,
        pages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (err) {
    console.error("Jobs fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
