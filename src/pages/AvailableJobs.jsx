import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AvailableJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      openings: 12,
      location: "Bangalore",
      deadline: "2026-10-15"
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Java Developer",
      openings: 8,
      location: "Hyderabad",
      deadline: "2026-10-20"
    },
    {
      id: 3,
      company: "Amazon",
      position: "Data Analyst",
      openings: 15,
      location: "Chennai",
      deadline: "2026-10-25"
    },
    {
      id: 4,
      company: "Infosys",
      position: "Web Developer",
      openings: 20,
      location: "Pune",
      deadline: "2026-10-30"
    },
    {
      id: 5,
      company: "TCS",
      position: "Software Developer",
      openings: 18,
      location: "Hyderabad",
      deadline: "2026-11-05"
    }
  ]);

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const savedApplicants =
      JSON.parse(localStorage.getItem("applicants")) || [];

    setApplicants(savedApplicants);
  }, []);

  const isApplied = (job) => {
    return applicants.some(
      (applicant) =>
        applicant.company === job.company &&
        applicant.position === job.position
    );
  };

  const handleApply = (job) => {
    navigate("/edit-job", {
      state: {
        company: job.company,
        position: job.position,
        location: job.location
      }
    });
  };

  return (
    <div className="jobs-page">

      <div className="jobs-container">

        <div className="jobs-header">

          <div>
            <h1>Available Jobs</h1>
            <p>
              Explore job opportunities and track your applications
            </p>
          </div>

          <button
            className="my-applications-button"
            onClick={() => navigate("/applicants")}
          >
            My Applications
          </button>

        </div>

        <div className="jobs-summary">

          <div className="summary-box">
            <h2>{jobs.length}</h2>
            <p>Companies</p>
          </div>

          <div className="summary-box">
            <h2>
              {jobs.reduce(
                (total, job) => total + job.openings,
                0
              )}
            </h2>
            <p>Total Openings</p>
          </div>

          <div className="summary-box">
            <h2>{applicants.length}</h2>
            <p>Jobs Applied</p>
          </div>

        </div>

        <div className="jobs-list">

          {jobs.map((job) => {

            const applied = isApplied(job);

            return (
              <div className="job-card" key={job.id}>

                <div className="company-icon">
                  {job.company.charAt(0)}
                </div>

                <div className="job-information">

                  <h2>{job.position}</h2>

                  <h3>{job.company}</h3>

                  <div className="job-details">

                    <span>
                      📍 {job.location}
                    </span>

                    <span>
                      👥 {job.openings} openings
                    </span>

                    <span>
                      📅 Apply before {job.deadline}
                    </span>

                  </div>

                </div>

                <div className="job-action">

                  {applied ? (
                    <div className="applied-status">
                      ✓ Applied
                    </div>
                  ) : (
                    <button
                      className="apply-button"
                      onClick={() => handleApply(job)}
                    >
                      Apply Now
                    </button>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default AvailableJobs;