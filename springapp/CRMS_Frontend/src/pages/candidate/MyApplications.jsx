import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, FileText, ChevronRight, MessageSquare, X, User } from 'lucide-react';
import JobApplicationService from '../../services/JobApplicationService';
import FeedbackService from '../../services/FeedbackService';
import { motion, AnimatePresence } from 'framer-motion';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await JobApplicationService.getAll();
      const user = JSON.parse(localStorage.getItem('user'));
      // Filter applications for the current user
      const myApps = data.filter(app => app.candidate?.userId === user.userId);
      setApplications(myApps || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (app) => {
    setSelectedApp(app);
    setShowModal(true);
    setLoadingFeedback(true);
    try {
      const data = await FeedbackService.getByApplicationId(app.applicationId);
      setFeedbacks(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFeedback(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACCEPTED': return '#10b981';
      case 'REJECTED': return '#ef4444';
      case 'PENDING': return '#f59e0b';
      default: return 'var(--text-muted)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACCEPTED': return <CheckCircle size={16} />;
      case 'REJECTED': return <XCircle size={16} />;
      case 'PENDING': return <Clock size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>My Applications</h2>
        <p style={{ color: 'var(--text-muted)' }}>Keep track of your application status and recruiter feedback.</p>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Position</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Date Applied</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>You haven't applied to any jobs yet.</td></tr>
              ) : applications.map((app) => (
                <tr key={app.applicationId} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>#{app.applicationId}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--secondary)' }}>{app.jobPosition?.positionTitle}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.jobPosition?.department?.name}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>{new Date().toLocaleDateString()}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.4rem', 
                      padding: '0.4rem 0.8rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 700,
                      background: `${getStatusColor(app.status)}15`,
                      color: getStatusColor(app.status),
                      textTransform: 'uppercase'
                    }}>
                      {getStatusIcon(app.status)} {app.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleViewDetails(app)}
                      style={{ color: 'var(--primary)', background: 'var(--background)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showModal && selectedApp && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)} 
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="card" style={{ width: '100%', maxWidth: '600px', position: 'relative', zIndex: 1, padding: '2.5rem', maxHeight: '90vh', overflowY: 'auto', border: 'none' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--secondary)' }}>Application Details</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '50%', color: 'var(--text-muted)' }}><X size={20} /></button>
              </div>

              <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--background)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Position</div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--secondary)' }}>{selectedApp.jobPosition?.positionTitle}</h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{selectedApp.jobPosition?.department?.name} • {selectedApp.jobPosition?.location}</div>
              </div>

              <div>
                <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                  <MessageSquare size={18} style={{ color: 'var(--primary)' }} /> Recruiter Feedback
                </h4>

                {loadingFeedback ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading feedback...</p>
                ) : feedbacks.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '12px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No feedback available yet. Your application is still being reviewed.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {feedbacks.map((f, i) => (
                      <div key={i} style={{ padding: '1.25rem', borderRadius: '12px', background: 'var(--background)', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)' }}>{f.interviewRound}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Provided by {f.user?.username || 'Recruiter'}</div>
                        </div>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>"{f.content}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyApplications;
