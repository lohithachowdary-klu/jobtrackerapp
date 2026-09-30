import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Applicants() {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    loadApplicants();
  }, []);

  const loadApplicants = () => {
    const savedApplicants =
      JSON.parse(localStorage.getItem("applicants")) || [];

    setApplicants(savedApplicants);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this applicant?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedApplicants = applicants.filter(
      (applicant) => applicant.id !== id
    );

    localStorage.setItem(
      "applicants",
      JSON.stringify(updatedApplicants)
    );

    setApplicants(updatedApplicants);
  };

  return (
    <div className="applicants-page">
      <div className="applicants-container">

        <div className="applicants-header">
          <div>
            <h1>Applicants</h1>
            <p>Select an applicant to view their details</p>
          </div>

          <button onClick={() => navigate("/edit-job")}>
            + Add Applicant
          </button>
        </div>

        <div className="applicant-list">

          {applicants.length === 0 ? (
            <div className="no-applicants">
              <h2>No applicants yet</h2>
              <p>Add your first applicant.</p>

              <button onClick={() => navigate("/edit-job")}>
                Add Applicant
              </button>
            </div>
          ) : (
            applicants.map((applicant) => (
              <div
                className="applicant-name"
                key={applicant.id}
              >

                <div
                  className="name-section"
                  onClick={() =>
                    navigate(`/applicant/${applicant.id}`)
                  }
                >
                  <div className="name-icon">
                    👤
                  </div>

                  <div>
                    <h3>{applicant.name}</h3>
                    <p>{applicant.position}</p>
                  </div>
                </div>

                <div className="applicant-actions">

                  <button
                    className="view-button"
                    onClick={() =>
                      navigate(`/applicant/${applicant.id}`)
                    }
                  >
                    View
                  </button>

                  <button
                    className="edit-button"
                    onClick={() =>
                      navigate(`/edit-job/${applicant.id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(applicant.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default Applicants;