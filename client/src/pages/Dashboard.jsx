import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import SearchFilters from "../components/SearchFilters";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import { HiOutlineSearchCircle, HiOutlineEmojiSad } from "react-icons/hi";

export default function Dashboard() {
  const [domain, setDomain] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [remote, setRemote] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch on mount (show all jobs)
  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchJobs = async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = { page };
      if (domain !== "all") params.domain = domain;
      if (jobType !== "all") params.type = jobType;
      if (remote) params.remote = "true";

      const { data } = await api.get("/jobs", { params });
      setJobs(data.jobs);
      setPagination(data.pagination);
      setHasSearched(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchJobs(1);

  return (
    <div className="min-h-screen bg-grid relative">
      <div className="hero-glow" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Discover <span className="gradient-text">IT Opportunities</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Search across thousands of curated tech jobs and internships
          </p>
        </div>

        {/* Filters */}
        <SearchFilters
          domain={domain}
          setDomain={setDomain}
          jobType={jobType}
          setJobType={setJobType}
          remote={remote}
          setRemote={setRemote}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Results */}
        {loading ? (
          <Loader count={4} />
        ) : error ? (
          <div className="card text-center py-12">
            <HiOutlineEmojiSad className="w-12 h-12 mx-auto text-red-400 mb-3" />
            <p className="text-red-400 text-lg font-medium">{error}</p>
            <p className="text-gray-500 text-sm mt-1">
              Please try again or adjust your filters.
            </p>
          </div>
        ) : hasSearched && jobs.length === 0 ? (
          <div className="card text-center py-12">
            <HiOutlineSearchCircle className="w-12 h-12 mx-auto text-gray-600 mb-3" />
            <p className="text-gray-400 text-lg font-medium">
              No jobs found for this criteria
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Try adjusting your filters or selecting a different domain.
            </p>
          </div>
        ) : (
          <>
            {/* Job count */}
            {pagination && (
              <p className="text-sm text-gray-500 mb-4">
                Showing{" "}
                <span className="text-white font-medium">{jobs.length}</span> of{" "}
                <span className="text-white font-medium">{pagination.total}</span>{" "}
                results
              </p>
            )}

            {/* Job cards */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.job_id || job._id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  id="prev-page"
                  onClick={() => fetchJobs(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-400 px-4">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  id="next-page"
                  onClick={() => fetchJobs(pagination.page + 1)}
                  disabled={pagination.page >= pagination.pages}
                  className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-16 py-6">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} DevScout. Powered by JSearch API.
        </p>
      </footer>
    </div>
  );
}
