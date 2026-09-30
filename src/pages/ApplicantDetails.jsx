import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ApplicantDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [applicant, setApplicant] = useState(null);

  useEffect(() => {

    const applicants =
      JSON.parse(localStorage.getItem("applicants")) || [];

    const selectedApplicant =
      applicants.find(
        (person) => person.id.toString() === id
      );

    setApplicant(selectedApplicant);

  }, [id]);

  if (!applicant) {

    return (
      <div className="details-page">

        <h2>Applicant not found</h2>

        <button
          onClick={() => navigate("/applicants")}
        >
          Back
        </button>

      </div>
    );
  }

  return (
    <div className="details-page">

      <div className="details-container">

        <button
          className="back-button"
          onClick={() => navigate("/applicants")}
        >
          ← Back to Applicants
        </button>

        <div className="profile-header">

          <div className="large-icon">
            👤
          </div>

          <div>
            <h1>{applicant.name}</h1>

            <p>
              {applicant.position}
            </p>
          </div>

        </div>

        <div className="details-card">

          <h2>Applicant Details</h2>

          <div className="details-grid">

            <div>
              <span>Name</span>
              <strong>{applicant.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{applicant.email || "Not provided"}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{applicant.phone || "Not provided"}</strong>
            </div>

            <div>
              <span>Company</span>
              <strong>{applicant.company}</strong>
            </div>

            <div>
              <span>Job Position</span>
              <strong>{applicant.position}</strong>
            </div>

            <div>
              <span>Application Date</span>
              <strong>{applicant.date || "Not provided"}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{applicant.location || "Not provided"}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong className="detail-status">
                {applicant.status}
              </strong>
            </div>

          </div>

          <div className="notes">

            <h3>Notes</h3>

            <p>
              {applicant.notes || "No notes available."}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ApplicantDetails;