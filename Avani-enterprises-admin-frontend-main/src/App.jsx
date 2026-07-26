import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AllLeads from "./pages/AllLeads";
import SiteAnalytics from "./pages/SiteAnalytics";
import SecurityLog from "./pages/SecurityLog";
import ContactedLeads from "./pages/ContactedLeads";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import AvaniFormDetail from "./pages/AvaniFormDetail";
import AvaniFormsPage from "./pages/AvaniFormsPage";
import Consultations from "./pages/Consultations";
import JobManagement from "./pages/JobManagement";
import ApplicationManagement from "./pages/ApplicationManagement";
import JobAnalytics from "./pages/JobAnalytics";
import JobsDashboard from "./pages/JobsDashboard";
import SeoManager from "./pages/SeoManager";
import BlogManagement from "./pages/BlogManagement";
import NewsletterManagement from "./pages/NewsletterManagement";
import SevenDayLaunch from "./pages/SevenDayLaunch";
import LandingPageFree from "./pages/LandingPageFree";
import GrowthPlanLeads from "./pages/GrowthPlanLeads";
import LinkManagement from "./pages/LinkManagement";
import LinkAnalytics from "./pages/LinkAnalytics";
import AdminLayout from "./AdminLayout";
import { Loader2 } from "lucide-react";


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loader2 className="animate-spin h-8 w-8 text-black" />
      </div>
    );
  }

  if (!user && !localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route (Redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user || localStorage.getItem("token")) {
    // Basic check, accurate user state is updated in context effect
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />

          {/* Protected App Routes (nested under AdminLayout so Sidebar persists) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* One lead inbox. 7-Day Launch / LandingPageFree / Dashboard were
                the same table hard-filtered to one `source` value each, which
                hid every lead from the ~460 pages using the shared form. They
                are now filters inside AllLeads. The old pages stay routed but
                unlinked so nothing is lost if you want them back. */}
            <Route index element={<AllLeads />} />
            <Route path="7-day-launch" element={<SevenDayLaunch />} />
            <Route path="landing-page-free" element={<LandingPageFree />} />
            <Route path="legacy-dashboard" element={<Dashboard />} />
            <Route path="contacted-leads" element={<ContactedLeads />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            {/* First-party site analytics and the admin security log. */}
            <Route path="site-analytics" element={<SiteAnalytics />} />
            <Route path="security" element={<SecurityLog />} />
            <Route path="growth-plan-leads" element={<GrowthPlanLeads />} />
            <Route path="avani-forms/:id" element={<AvaniFormDetail />} />
            <Route path="avani-forms" element={<AvaniFormsPage />} />
            {/* Consultations read the exact same endpoint as avani-forms with
                no filter — the same rows twice. Redirected, file kept. */}
            <Route path="consultations" element={<Navigate to="/avani-forms" replace />} />
            <Route path="seo" element={<SeoManager />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="newsletters" element={<NewsletterManagement />} />
            <Route path="jobs-dashboard" element={<JobsDashboard />} />
            <Route path="jobs" element={<JobManagement />} />
            <Route path="applications" element={<ApplicationManagement />} />
            <Route path="job-analytics" element={<JobAnalytics />} />
            <Route path="links" element={<LinkManagement />} />
            <Route path="link-analytics" element={<LinkAnalytics />} />
          </Route>

          {/* Job Management Routes */}
          <Route
            path="/jobs-dashboard"
            element={
              <ProtectedRoute>
                <JobsDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <ApplicationManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job-analytics"
            element={
              <ProtectedRoute>
                <JobAnalytics />
              </ProtectedRoute>
            }
          />

          {/* Fallback: unknown route -> dashboard (or login if not authed) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
