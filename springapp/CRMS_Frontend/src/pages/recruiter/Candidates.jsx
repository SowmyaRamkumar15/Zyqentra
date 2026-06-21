import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, CheckCircle, XCircle, Clock, FileText, User, MessageSquare, X } from 'lucide-react';
import JobApplicationService from '../../services/JobApplicationService';
import FeedbackService from '../../services/FeedbackService';
import { useToast } from '../../context/ToastContext';
import { motion } from 'framer-motion';

const Candidates = () => {
  const { showToast } = useToast();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackRound, setFeedbackRound] = useState('Technical Interview');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await JobApplicationService.getAll();
      // Sort by newest first
      const sorted = (data || []).sort((a, b) => b.applicationId - a.applicationId);
      setApplications(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus, currentApp) => {
    try {
      const updatedApp = { ...currentApp, status: newStatus };
      await JobApplicationService.update(id, updatedApp);
      fetchApplications();
      showToast(`Candidate marked as ${newStatus.toLowerCase()} successfully!`);
    } catch (err) {
      console.error(err);
      showToast('Failed to update candidate status.', 'error');
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await FeedbackService.create({
        content: feedbackContent,
        interviewRound: feedbackRound,
        isInternal: false,
        jobApplication: { applicationId: selectedApp.applicationId },
        user: { userId: user.userId }
      });
      showToast('Feedback submitted successfully!');
      setShowFeedbackModal(false);
      setFeedbackContent('');
    } catch (err) {
      console.error(err);
      showToast('Failed to submit feedback.', 'error');
    } finally {
      setSubmittingFeedback(false);
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
      case 'ACCEPTED': return <CheckCircle size={14} />;
      case 'REJECTED': return <XCircle size={14} />;
      case 'PENDING': return <Clock size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const filteredApps = applications.filter(app => 
    app.jobPosition?.positionTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.candidate?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Candidate Pool</h2>
        <p style={{ color: 'var(--text-muted)' }}>Review applicants and manage their recruitment status.</p>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by role, candidate, or status..." 
              style={{ paddingLeft: '3rem' }} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Candidate</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Position</th>
                <th style={{ textAlign: 'center', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Status</th>
                <th style={{ textAlign: 'center', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading candidates...</td></tr>
              ) : filteredApps.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No candidates found matching your criteria.</td></tr>
              ) : filteredApps.map((app) => (
                <tr key={app.applicationId} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>#{app.applicationId}</td>
                  
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="flex-center" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--background)', color: 'var(--text-muted)' }}>
                        <User size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--secondary)' }}>{app.candidate?.username || 'Unknown'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.candidate?.email || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-main)' }}>{app.jobPosition?.positionTitle}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.jobPosition?.department?.departmentName}</div>
                  </td>
                  
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.25rem', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 700,
                      background: `${getStatusColor(app.status)}15`,
                      color: getStatusColor(app.status)
                    }}>
                      {getStatusIcon(app.status)} {app.status}
                    </span>
                  </td>
                  
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleStatusUpdate(app.applicationId, 'ACCEPTED', app)}
                        disabled={app.status === 'ACCEPTED'}
                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, background: app.status === 'ACCEPTED' ? 'var(--background)' : '#10b981', color: app.status === 'ACCEPTED' ? 'var(--text-muted)' : 'white', opacity: app.status === 'ACCEPTED' ? 0.5 : 1 }}
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(app.applicationId, 'REJECTED', app)}
                        disabled={app.status === 'REJECTED'}
                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, background: app.status === 'REJECTED' ? 'var(--background)' : '#ef4444', color: app.status === 'REJECTED' ? 'var(--text-muted)' : 'white', opacity: app.status === 'REJECTED' ? 0.5 : 1 }}
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => { setSelectedApp(app); setShowFeedbackModal(true); }}
                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, background: 'var(--background)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem', border: '1px solid var(--border)' }}
                      >
                        <MessageSquare size={14} /> Feedback
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showFeedbackModal && createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setShowFeedbackModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="card" style={{ width: '100%', maxWidth: '500px', position: 'relative', zIndex: 1, padding: '2.5rem', border: 'none' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--secondary)' }}>Provide Interview Feedback</h3>
              <button onClick={() => setShowFeedbackModal(false)} style={{ background: 'transparent', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleFeedbackSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Interview Round</label>
                <select 
                  required 
                  value={feedbackRound} 
                  onChange={(e) => setFeedbackRound(e.target.value)}
                  style={{ background: 'var(--background)', color: 'var(--text-main)' }}
                >
                  <option value="Technical Interview">Technical Interview</option>
                  <option value="HR Interview">HR Interview</option>
                  <option value="Group Discussion">Group Discussion</option>
                  <option value="Aptitude Test">Aptitude Test</option>
                  <option value="Managerial Round">Managerial Round</option>
                </select>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Feedback Content</label>
                <textarea 
                  required rows="5" 
                  placeholder="Share your thoughts on the candidate's performance..."
                  value={feedbackContent}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                  style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)', resize: 'none' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setShowFeedbackModal(false)} className="btn-secondary" style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius)', background: 'var(--background)', color: 'var(--text-main)', fontWeight: 600, border: '1px solid var(--border)' }}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={submittingFeedback} style={{ flex: 2, padding: '0.75rem', borderRadius: 'var(--radius)', fontWeight: 600 }}>
                  {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Candidates;
