import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const RecruiterDashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-container"
    >
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Recruiter Portal</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage jobs, candidates, and interviews</p>
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '2rem', minHeight: '60vh' }}>
        <Outlet />
      </div>
    </motion.div>
  );
};

export default RecruiterDashboard;
