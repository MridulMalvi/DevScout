/**
 * Seed script — populates MongoDB with sample job data for local dev/testing.
 * Run with:  npm run seed
 */
require("dotenv").config();
require("dns").setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
const Job = require("../models/Job");

const SAMPLE_JOBS = [
  // SDE
  { job_id: "seed-sde-1", employer_name: "Google", employer_logo: null, job_title: "Software Engineer III", domain: "SDE", job_employment_type: "FULLTIME", job_is_remote: false, job_apply_link: "https://careers.google.com", job_description: "Design and build scalable distributed systems. Work on Google Cloud Platform services and internal infrastructure.", job_city: "Mountain View", job_state: "CA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-10") },
  { job_id: "seed-sde-2", employer_name: "Microsoft", employer_logo: null, job_title: "Full Stack Developer", domain: "SDE", job_employment_type: "FULLTIME", job_is_remote: true, job_apply_link: "https://careers.microsoft.com", job_description: "Build modern web applications using React, Node.js, and Azure. Collaborate with cross-functional teams.", job_city: "Redmond", job_state: "WA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-12") },
  { job_id: "seed-sde-3", employer_name: "Stripe", employer_logo: null, job_title: "Backend Engineer", domain: "SDE", job_employment_type: "FULLTIME", job_is_remote: true, job_apply_link: "https://stripe.com/jobs", job_description: "Build reliable and performant payment infrastructure. Ruby, Java, or Go experience preferred.", job_city: "San Francisco", job_state: "CA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-14") },
  { job_id: "seed-sde-4", employer_name: "Amazon", employer_logo: null, job_title: "SDE Intern", domain: "SDE", job_employment_type: "INTERN", job_is_remote: false, job_apply_link: "https://amazon.jobs", job_description: "Summer internship for software development. Work on real-world projects impacting millions of customers.", job_city: "Seattle", job_state: "WA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-08") },
  { job_id: "seed-sde-5", employer_name: "Shopify", employer_logo: null, job_title: "React Developer (Contract)", domain: "SDE", job_employment_type: "CONTRACTOR", job_is_remote: true, job_apply_link: "https://shopify.com/careers", job_description: "6-month contract building merchant-facing dashboards with React and TypeScript.", job_city: "Ottawa", job_state: "ON", job_country: "CA", job_posted_at_datetime_utc: new Date("2026-03-11") },

  // Data Science
  { job_id: "seed-ds-1", employer_name: "Netflix", employer_logo: null, job_title: "Data Scientist", domain: "Data Science", job_employment_type: "FULLTIME", job_is_remote: false, job_apply_link: "https://jobs.netflix.com", job_description: "Apply statistical models to improve content recommendation algorithms. Python, SQL, and experimentation expertise.", job_city: "Los Gatos", job_state: "CA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-09") },
  { job_id: "seed-ds-2", employer_name: "Spotify", employer_logo: null, job_title: "Data Science Intern", domain: "Data Science", job_employment_type: "INTERN", job_is_remote: true, job_apply_link: "https://spotifyjobs.com", job_description: "Intern with the data science team analyzing user listening patterns and building predictive models.", job_city: "Stockholm", job_state: "", job_country: "SE", job_posted_at_datetime_utc: new Date("2026-03-13") },
  { job_id: "seed-ds-3", employer_name: "Meta", employer_logo: null, job_title: "Senior Data Scientist", domain: "Data Science", job_employment_type: "FULLTIME", job_is_remote: false, job_apply_link: "https://metacareers.com", job_description: "Lead data science initiatives for ads ranking. Experience with large-scale experimentation required.", job_city: "Menlo Park", job_state: "CA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-15") },

  // ML
  { job_id: "seed-ml-1", employer_name: "DeepMind", employer_logo: null, job_title: "ML Research Engineer", domain: "ML", job_employment_type: "FULLTIME", job_is_remote: false, job_apply_link: "https://deepmind.google/careers", job_description: "Research and develop novel machine learning algorithms. Strong background in deep learning and PyTorch/JAX.", job_city: "London", job_state: "", job_country: "GB", job_posted_at_datetime_utc: new Date("2026-03-10") },
  { job_id: "seed-ml-2", employer_name: "OpenAI", employer_logo: null, job_title: "ML Engineer", domain: "ML", job_employment_type: "FULLTIME", job_is_remote: true, job_apply_link: "https://openai.com/careers", job_description: "Build and optimize training pipelines for large language models. Experience with distributed computing.", job_city: "San Francisco", job_state: "CA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-12") },
  { job_id: "seed-ml-3", employer_name: "NVIDIA", employer_logo: null, job_title: "ML Intern", domain: "ML", job_employment_type: "INTERN", job_is_remote: false, job_apply_link: "https://nvidia.com/careers", job_description: "Work on GPU-accelerated machine learning frameworks. Ideal for graduate students.", job_city: "Santa Clara", job_state: "CA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-14") },

  // AI
  { job_id: "seed-ai-1", employer_name: "Google DeepMind", employer_logo: null, job_title: "AI Research Scientist", domain: "AI", job_employment_type: "FULLTIME", job_is_remote: false, job_apply_link: "https://deepmind.google/careers", job_description: "Conduct fundamental AI research in areas like reinforcement learning, NLP, and multi-agent systems.", job_city: "London", job_state: "", job_country: "GB", job_posted_at_datetime_utc: new Date("2026-03-11") },
  { job_id: "seed-ai-2", employer_name: "Apple", employer_logo: null, job_title: "AI/ML Engineer", domain: "AI", job_employment_type: "FULLTIME", job_is_remote: false, job_apply_link: "https://apple.com/careers", job_description: "Build on-device AI features for iOS. Core ML, NLP, and computer vision experience preferred.", job_city: "Cupertino", job_state: "CA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-13") },
  { job_id: "seed-ai-3", employer_name: "Anthropic", employer_logo: null, job_title: "AI Safety Intern", domain: "AI", job_employment_type: "INTERN", job_is_remote: true, job_apply_link: "https://anthropic.com/careers", job_description: "Research AI alignment and safety techniques. PhD students in ML/AI preferred.", job_city: "San Francisco", job_state: "CA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-15") },

  // Cloud Computing
  { job_id: "seed-cloud-1", employer_name: "AWS", employer_logo: null, job_title: "Cloud Solutions Architect", domain: "Cloud Computing", job_employment_type: "FULLTIME", job_is_remote: true, job_apply_link: "https://amazon.jobs", job_description: "Design cloud architectures for enterprise customers. AWS certifications and 5+ years of experience.", job_city: "Seattle", job_state: "WA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-10") },
  { job_id: "seed-cloud-2", employer_name: "Google Cloud", employer_logo: null, job_title: "Cloud Engineer", domain: "Cloud Computing", job_employment_type: "FULLTIME", job_is_remote: false, job_apply_link: "https://careers.google.com", job_description: "Build and maintain GCP infrastructure. Kubernetes, Terraform, and CI/CD pipeline experience.", job_city: "Sunnyvale", job_state: "CA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-12") },
  { job_id: "seed-cloud-3", employer_name: "Microsoft Azure", employer_logo: null, job_title: "Cloud Intern", domain: "Cloud Computing", job_employment_type: "INTERN", job_is_remote: true, job_apply_link: "https://careers.microsoft.com", job_description: "Internship with the Azure team working on cloud-native services. CS students with cloud experience.", job_city: "Redmond", job_state: "WA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-14") },

  // Cybersecurity
  { job_id: "seed-sec-1", employer_name: "CrowdStrike", employer_logo: null, job_title: "Security Analyst", domain: "Cybersecurity", job_employment_type: "FULLTIME", job_is_remote: true, job_apply_link: "https://crowdstrike.com/careers", job_description: "Monitor and respond to security incidents. SIEM tools, threat hunting, and incident response.", job_city: "Austin", job_state: "TX", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-09") },
  { job_id: "seed-sec-2", employer_name: "Palo Alto Networks", employer_logo: null, job_title: "Cybersecurity Engineer", domain: "Cybersecurity", job_employment_type: "FULLTIME", job_is_remote: false, job_apply_link: "https://paloaltonetworks.com/careers", job_description: "Design and implement network security solutions. Firewall, IDS/IPS, and zero-trust architecture.", job_city: "Santa Clara", job_state: "CA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-11") },
  { job_id: "seed-sec-3", employer_name: "IBM Security", employer_logo: null, job_title: "Security Intern", domain: "Cybersecurity", job_employment_type: "INTERN", job_is_remote: false, job_apply_link: "https://ibm.com/employment", job_description: "Summer intern working on security assessment tools and penetration testing frameworks.", job_city: "Armonk", job_state: "NY", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-13") },
  { job_id: "seed-sec-4", employer_name: "Cloudflare", employer_logo: null, job_title: "Security Engineer (Part-time)", domain: "Cybersecurity", job_employment_type: "PARTTIME", job_is_remote: true, job_apply_link: "https://cloudflare.com/careers", job_description: "Part-time role improving DDoS mitigation and WAF rule sets. Flexible hours.", job_city: "San Francisco", job_state: "CA", job_country: "US", job_posted_at_datetime_utc: new Date("2026-03-15") },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    for (const job of SAMPLE_JOBS) {
      await Job.findOneAndUpdate({ job_id: job.job_id }, job, {
        upsert: true,
        new: true,
      });
    }

    console.log(`🌱 Seeded ${SAMPLE_JOBS.length} sample jobs`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();
