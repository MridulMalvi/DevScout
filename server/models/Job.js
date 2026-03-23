const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    job_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    employer_name: {
      type: String,
      default: "Unknown",
    },
    employer_logo: {
      type: String,
      default: null,
    },
    job_title: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
      index: true,
    },
    job_employment_type: {
      type: String,
      default: "FULLTIME",
    },
    job_is_remote: {
      type: Boolean,
      default: false,
      index: true,
    },
    job_apply_link: {
      type: String,
      default: "#",
    },
    job_description: {
      type: String,
      default: "",
    },
    job_city: {
      type: String,
      default: "",
    },
    job_state: {
      type: String,
      default: "",
    },
    job_country: {
      type: String,
      default: "",
    },
    job_posted_at_datetime_utc: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index for common query patterns
jobSchema.index({ domain: 1, job_employment_type: 1, job_is_remote: 1 });

module.exports = mongoose.model("Job", jobSchema);
