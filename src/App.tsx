import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import JobsPage from "./pages/Jobs";
import CandidatesPage from "./pages/Candidates";
import InsightsPage from "./pages/Insights"
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route path="jobs" element={<JobsPage />} />
              </Routes>
              <Routes>
                <Route path="candidates" element={<CandidatesPage />} />
              </Routes>
              <Routes>
                <Route path="insights" element={<InsightsPage />} />
              </Routes>
              <Routes>
                <Route path="chatbot" element={<Chatbot />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
