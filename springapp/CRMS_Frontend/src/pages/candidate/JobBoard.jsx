import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Users, Calendar, ArrowRight, ExternalLink, CheckCircle } from 'lucide-react';
import JobService from '../../services/JobService';
import JobApplicationService from '../../services/JobApplicationService';
import { useToast } from '../../context/ToastContext';

const JobBoard = () => {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [applying, setApplying] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await JobService.getAll();
      setJobs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) {
      fetchJobs();
      return;
    }
    setLoading(true);
    try {
      const data = await JobService.search(searchTerm);
      setJobs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyForJob = async (jobId) => {
    setApplying(jobId);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await JobApplicationService.create({
        candidate: { userId: user.userId },
        jobPosition: { positionId: jobId },
        status: 'PENDING',
        priority: 'MEDIUM',
        coverLetter: 'I am excited to apply for this position because of my passion for technology and alignment with your company values.'
      });
      setAppliedJobs(prev => [...prev, jobId]);
      showToast('Application submitted successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to apply. ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setApplying(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Explore Opportunities</h2>
        <p style={{ color: 'var(--text-muted)' }}>Find your dream job among 100+ open positions from top companies.</p>
      </div>

      <div className="card glass" style={{ marginBottom: '3rem', padding: '2rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by role, company, or keywords..." 
              style={{ paddingLeft: '3.5rem', height: '56px', fontSize: '1rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '0 2rem', height: '56px' }}>
            Find Jobs
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : jobs.map((job) => (
          <div key={job.positionId} className="card" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            transition: 'transform 0.3s ease',
            cursor: 'default'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                {job.department?.departmentName || 'Technical'}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>{job.positionTitle}</h3>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{job.location} • Full Time</div>
            </div>

            <p style={{ 
              color: 'var(--text-muted)', 
              fontSize: '0.9rem', 
              marginBottom: '1.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1
            }}>
              {job.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
              <span style={{ padding: '0.25rem 0.75rem', background: 'var(--background)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                {job.experienceRequired}
              </span>
              <span style={{ padding: '0.25rem 0.75rem', background: 'var(--background)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                {job.openings} Openings
              </span>
            </div>

            {appliedJobs.includes(job.positionId) ? (
              <button 
                disabled
                className="btn-primary" 
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#10b981', boxShadow: 'none' }}
              >
                <CheckCircle size={16} /> Application Sent
              </button>
            ) : (
              <button 
                onClick={() => applyForJob(job.positionId)}
                disabled={applying === job.positionId}
                className="btn-primary" 
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {applying === job.positionId ? 'Processing...' : 'Apply Now'} <ExternalLink size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
