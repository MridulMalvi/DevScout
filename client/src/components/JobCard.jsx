import {
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineClock,
  HiOutlineExternalLink,
  HiOutlineGlobe,
} from "react-icons/hi";

const TYPE_LABELS = {
  FULLTIME: "Full-time",
  PARTTIME: "Part-time",
  CONTRACTOR: "Contract",
  INTERN: "Internship",
};

const TYPE_COLORS = {
  FULLTIME: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  PARTTIME: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  CONTRACTOR: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  INTERN: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

function timeAgo(dateString) {
  const now = new Date();
  const posted = new Date(dateString);
  const diffMs = now - posted;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export default function JobCard({ job }) {
  const location = [job.job_city, job.job_state, job.job_country]
    .filter(Boolean)
    .join(", ");

  const snippet =
    job.job_description?.length > 180
      ? job.job_description.substring(0, 180) + "…"
      : job.job_description || "No description available.";

  const typeLabel = TYPE_LABELS[job.job_employment_type] || job.job_employment_type;
  const typeColor =
    TYPE_COLORS[job.job_employment_type] || "bg-gray-500/10 text-gray-400 border-gray-500/20";

  return (
    <div className="card glass-hover group">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Employer logo / placeholder */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center shrink-0 text-lg font-bold text-brand-400">
          {job.employer_logo ? (
            <img
              src={job.employer_logo}
              alt={job.employer_name}
              className="w-full h-full object-contain rounded-xl"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <span
            className={`${job.employer_logo ? "hidden" : "flex"} items-center justify-center w-full h-full`}
          >
            {job.employer_name?.charAt(0) || "?"}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title & Company */}
          <h3 className="text-lg font-semibold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
            {job.job_title}
          </h3>
          <p className="text-sm text-gray-400 mt-0.5">{job.employer_name}</p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
            {location && (
              <span className="flex items-center gap-1">
                <HiOutlineLocationMarker className="w-3.5 h-3.5" />
                {location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <HiOutlineBriefcase className="w-3.5 h-3.5" />
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${typeColor}`}>
                {typeLabel}
              </span>
            </span>
            {job.job_is_remote && (
              <span className="flex items-center gap-1 text-teal-400">
                <HiOutlineGlobe className="w-3.5 h-3.5" />
                Remote
              </span>
            )}
            <span className="flex items-center gap-1">
              <HiOutlineClock className="w-3.5 h-3.5" />
              {timeAgo(job.job_posted_at_datetime_utc)}
            </span>
          </div>

          {/* Description snippet */}
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            {snippet}
          </p>

          {/* Domain tag + Apply */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 font-medium">
              {job.domain}
            </span>
            <a
              href={job.job_apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs flex items-center gap-1"
            >
              Apply Now
              <HiOutlineExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
