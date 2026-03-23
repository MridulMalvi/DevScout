import { HiSearch } from "react-icons/hi";

const DOMAINS = [
  { value: "all", label: "All Domains" },
  { value: "SDE", label: "Software Development (SDE)" },
  { value: "Data Science", label: "Data Science" },
  { value: "ML", label: "Machine Learning (ML)" },
  { value: "AI", label: "Artificial Intelligence (AI)" },
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "Cybersecurity", label: "Cybersecurity" },
];

const JOB_TYPES = [
  { value: "all", label: "All Types" },
  { value: "fulltime", label: "Full-time" },
  { value: "parttime", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

export default function SearchFilters({
  domain,
  setDomain,
  jobType,
  setJobType,
  remote,
  setRemote,
  onSearch,
  loading,
}) {
  return (
    <div className="card mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Domain */}
        <div className="flex-1 w-full">
          <label
            htmlFor="domain-select"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Domain
          </label>
          <select
            id="domain-select"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="input-field cursor-pointer appearance-none"
          >
            {DOMAINS.map((d) => (
              <option
                key={d.value}
                value={d.value}
                className="bg-surface-800 text-white"
              >
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type */}
        <div className="flex-1 w-full">
          <label
            htmlFor="type-select"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Job Type
          </label>
          <select
            id="type-select"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="input-field cursor-pointer appearance-none"
          >
            {JOB_TYPES.map((t) => (
              <option
                key={t.value}
                value={t.value}
                className="bg-surface-800 text-white"
              >
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Remote Toggle */}
        <div className="flex items-center gap-3 h-[48px] px-4 rounded-xl bg-white/5 border border-white/10 shrink-0 w-full lg:w-auto justify-center lg:justify-start">
          <label
            htmlFor="remote-toggle"
            className="text-sm text-gray-400 cursor-pointer select-none"
          >
            Remote Only
          </label>
          <button
            id="remote-toggle"
            role="switch"
            aria-checked={remote}
            onClick={() => setRemote(!remote)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
              remote ? "bg-brand-500" : "bg-white/10"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                remote ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        {/* Search Button */}
        <button
          id="search-btn"
          onClick={onSearch}
          disabled={loading}
          className="btn-primary flex items-center gap-2 shrink-0 w-full lg:w-auto justify-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <HiSearch className="w-5 h-5" />
          )}
          Search
        </button>
      </div>
    </div>
  );
}
