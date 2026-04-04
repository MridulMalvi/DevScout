// Vercel Serverless Function — Express adapter
// This single file wraps the Express app for Vercel's serverless runtime.

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("../server/config/db");

const authRoutes = require("../server/routes/auth");
const jobRoutes = require("../server/routes/jobs");

const app = express();

// ── Middleware ──────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return cb(null, true);
      if (
        allowedOrigins.some(
          (allowed) => origin === allowed || origin.endsWith(".vercel.app")
        )
      ) {
        return cb(null, true);
      }
      cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ── DB connection (cached across warm invocations) ─────
let isConnected = false;
app.use(async (_req, _res, next) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  next();
});

// ── Routes ─────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Export for Vercel
module.exports = app;
