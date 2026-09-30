import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <BrowserRouter basename="/jobtrackerapp">

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Forgot Password */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Available Jobs */}
        <Route
          path="/jobs"
          element={<AvailableJobs />}
        />

        {/* Add Application */}
        <Route
          path="/edit-job"
          element={<EditJob />}
        />

        {/* Edit Application */}
        <Route
          path="/edit-job/:id"
          element={<EditJob />}
        />

        {/* Applicants */}
        <Route
          path="/applicants"
          element={<Applicants />}
        />

        {/* Applicant Details */}
        <Route
          path="/applicant/:id"
          element={<ApplicantDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;