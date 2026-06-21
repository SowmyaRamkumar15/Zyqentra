import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOverview from './pages/admin/AdminOverview';
import DepartmentList from './pages/admin/DepartmentList';
import JobManagement from './pages/admin/JobManagement';
import ApplicationManagement from './pages/admin/ApplicationManagement';
import UserManagement from './pages/admin/UserManagement';
import FeedbackManagement from './pages/admin/FeedbackManagement';
import StudentDashboard from './pages/candidate/StudentDashboard';
import StudentOverview from './pages/candidate/StudentOverview';
import JobBoard from './pages/candidate/JobBoard';
import MyApplications from './pages/candidate/MyApplications';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterOverview from './pages/recruiter/RecruiterOverview';
import ManageJobs from './pages/recruiter/ManageJobs';
import Candidates from './pages/recruiter/Candidates';
import Interviews from './pages/recruiter/Interviews';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AuthCallback from './pages/auth/AuthCallback';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Docs from './pages/Docs';
import SupportButton from './components/SupportButton';

const ScrollToTop = ({ scrollRef }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [pathname, scrollRef]);
  return null;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const ProtectedRoute = ({ children, role }) => {
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== `ROLE_${role}`) return <Navigate to="/" />;
    return children;
  };

  const mainRef = useRef(null);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop scrollRef={mainRef} />
      <div className="app" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Navbar user={user} setUser={setUser} />
        <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }}>
          {user && <Sidebar role={user.role} />}
          <main
            ref={mainRef}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              overflowX: 'hidden',
              overflowY: 'auto',
              background: 'var(--background)',
              scrollBehavior: 'smooth'
            }}
          >
            <div style={{ flex: 1, padding: user ? '2rem' : '0' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Navigate to="/login/student" />} />
                <Route path="/login/:role" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Navigate to="/register/student" />} />
                <Route path="/register/:role" element={<Register />} />
                <Route path="/auth/callback" element={<AuthCallback setUser={setUser} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                {/* Admin routes */}
                <Route path="/admin" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>}>
                  <Route index element={<AdminOverview />} />
                  <Route path="departments" element={<DepartmentList />} />
                  <Route path="jobs" element={<JobManagement />} />
                  <Route path="applications" element={<ApplicationManagement />} />
                  <Route path="feedbacks" element={<FeedbackManagement />} />
                  <Route path="users" element={<UserManagement />} />
                </Route>

                {/* Student routes */}
                <Route path="/student" element={<ProtectedRoute role="STUDENT"><StudentDashboard /></ProtectedRoute>}>
                  <Route index element={<StudentOverview />} />
                  <Route path="jobs" element={<JobBoard />} />
                  <Route path="applications" element={<MyApplications />} />
                </Route>

                {/* Recruiter routes */}
                <Route path="/recruiter" element={<ProtectedRoute role="RECRUITER"><RecruiterDashboard /></ProtectedRoute>}>
                  <Route index element={<RecruiterOverview />} />
                  <Route path="jobs" element={<ManageJobs />} />
                  <Route path="candidates" element={<Candidates />} />
                  <Route path="interviews" element={<Interviews />} />
                </Route>

                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/help" element={<Help />} />
                <Route path="/docs" element={<Docs />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <SupportButton />
            <Footer />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
