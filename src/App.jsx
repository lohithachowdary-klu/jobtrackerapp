import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AvailableJobs from "./pages/AvailableJobs";
import EditJob from "./pages/EditJob";
import Applicants from "./pages/Applicants";
import ApplicantDetails from "./pages/ApplicantDetails";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/jobs" element={<AvailableJobs />} />
      <Route path="/edit-job" element={<EditJob />} />
      <Route path="/edit-job/:id" element={<EditJob />} />
      <Route path="/applicants" element={<Applicants />} />
      <Route path="/applicant/:id" element={<ApplicantDetails />} />
    </Routes>
  );
}

export default App;
