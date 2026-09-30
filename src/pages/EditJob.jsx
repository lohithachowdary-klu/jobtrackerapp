import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditJob() {

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const selectedJob = location.state || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: selectedJob.company || "",
    position: selectedJob.position || "",
    date: "",
    status: "Applied",
    location: selectedJob.location || "",
    notes: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSave = (e) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.company ||
      !form.position
    ) {
      alert(
        "Please fill Name, Company and Job Position"
      );

      return;
    }

    const existingApplicants =
      JSON.parse(
        localStorage.getItem("applicants")
      ) || [];

    if (id) {

      const updatedApplicants =
        existingApplicants.map((applicant) =>
          applicant.id.toString() === id
            ? {
                ...applicant,
                ...form
              }
            : applicant
        );

      localStorage.setItem(
        "applicants",
        JSON.stringify(updatedApplicants)
      );

      alert("Application updated successfully!");

    } else {

      const newApplicant = {
        id: Date.now(),
        ...form
      };

      localStorage.setItem(
        "applicants",
        JSON.stringify([
          ...existingApplicants,
          newApplicant
        ])
      );

      alert("Application saved successfully!");

    }

    navigate("/applicants");

  };

  return (

    <div className="edit-page">

      <div className="edit-container">

        <h1>
          {id ? "Edit Application" : "Job Application"}
        </h1>

        <p className="page-description">
          Enter your application information
        </p>

        <form onSubmit={handleSave}>

          <div className="form-grid">

            <div>
              <label>
                Applicant Name
              </label>

              <input
                name="name"
                placeholder="Enter applicant name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>
                Phone
              </label>

              <input
                name="phone"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>
                Company
              </label>

              <input
                name="company"
                placeholder="Enter company"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>
                Job Position
              </label>

              <input
                name="position"
                placeholder="Enter job position"
                value={form.position}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>
                Application Date
              </label>

              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >

                <option>
                  Applied
                </option>

                <option>
                  Interview
                </option>

                <option>
                  Selected
                </option>

                <option>
                  Rejected
                </option>

              </select>

            </div>

            <div>
              <label>
                Location
              </label>

              <input
                name="location"
                placeholder="Enter job location"
                value={form.location}
                onChange={handleChange}
              />
            </div>

          </div>

          <div>

            <label>
              Notes
            </label>

            <textarea
              name="notes"
              placeholder="Enter additional information"
              value={form.notes}
              onChange={handleChange}
            />

          </div>

          <button
            className="save-button"
            type="submit"
          >
            {id
              ? "Update Application"
              : "Save Application"}
          </button>

        </form>

      </div>

    </div>

  );
}

export default EditJob;