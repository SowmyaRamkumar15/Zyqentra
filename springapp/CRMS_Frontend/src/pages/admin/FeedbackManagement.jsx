import { useState, useEffect } from 'react';
import { MessageSquare, User, Briefcase, Calendar, Search, Star, Clock } from 'lucide-react';
import FeedbackService from '../../services/FeedbackService';
import { useToast } from '../../context/ToastContext';
import { motion } from 'framer-motion';

const FeedbackManagement = () => {
  const { showToast } = useToast();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const data = await FeedbackService.getAll();
      setFeedbacks(data || []);
    } catch (err) {
      console.error(err);
      if (err.response?.status !== 204) {
        showToast('Failed to load feedbacks.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter(f => 
    f.jobApplication?.candidate?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.jobApplication?.jobPosition?.positionTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Interview Feedbacks</h2>
        <p style={{ color: 'var(--text-muted)' }}>Review and manage interview performance feedback for candidates.</p>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by candidate, role, or content..." 
              style={{ paddingLeft: '3rem' }} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {loading ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>Loading feedbacks...</p>
          ) : filteredFeedbacks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <MessageSquare size={48} style={{ color: 'var(--border)', marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-muted)' }}>No feedback records found.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
              {filteredFeedbacks.map((f) => (
                <motion.div 
                  key={f.feedbackId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card glass"
                  style={{ position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary)', color: 'white' }}>
                        <User size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{f.jobApplication?.candidate?.username}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.jobApplication?.candidate?.email}</div>
                      </div>
                    </div>
                    <div style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      fontSize: '0.7rem', 
                      fontWeight: 700, 
                      background: f.isInternal ? '#fee2e2' : '#e0e7ff',
                      color: f.isInternal ? '#ef4444' : 'var(--primary)'
                    }}>
                      {f.isInternal ? 'INTERNAL' : 'SHARED'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Briefcase size={14} /> {f.jobApplication?.jobPosition?.positionTitle}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Clock size={14} /> {f.interviewRound}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                    "{f.content}"
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Provided by: <span style={{ fontWeight: 600 }}>{f.user?.username || 'Admin'}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackManagement;
