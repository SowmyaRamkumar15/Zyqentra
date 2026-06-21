import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, MapPin, Users, Briefcase, X, Search } from 'lucide-react';
import JobService from '../../services/JobService';
import DepartmentService from '../../services/DepartmentService';
import { useToast } from '../../context/ToastContext';

const ManageJobs = () => {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentJob, setCurrentJob] = useState({
    positionTitle: '',
    description: '',
    location: '',
    experienceRequired: '',
    openings: 1,
    department: { departmentId: '' }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchDepartments();
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

  const fetchDepartments = async () => {
    try {
      const data = await DepartmentService.getAll();
      setDepartments(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditing) {
        await JobService.update(currentJob.positionId, currentJob);
      } else {
        await JobService.create(currentJob);
      }
      setShowModal(false);
      resetForm();
      fetchJobs();
      showToast(isEditing ? 'Job updated successfully!' : 'Job published successfully!');
    } catch (err) {
      console.error(err);
      const errorMsg = typeof err.response?.data === 'string' ? err.response.data : err.response?.data?.message || err.message;
      showToast('Failed to save job position. ' + errorMsg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentJob({
      positionTitle: '',
      description: '',
      location: '',
      experienceRequired: '',
      openings: 1,
      department: { departmentId: '' }
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job position?')) {
      try {
        await JobService.delete(id);
        fetchJobs();
        showToast('Job position deleted successfully!');
      } catch (err) {
        console.error(err);
        showToast('Failed to delete job position.', 'error');
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem' }}>Manage Jobs</h2>
          <p style={{ color: 'var(--text-muted)' }}>Create, edit, and track your job postings.</p>
        </div>
        <button 
          onClick={() => { setIsEditing(false); resetForm(); setShowModal(true); }}
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} /> Post New Job
        </button>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search by position or department..." style={{ paddingLeft: '3rem', maxWidth: '400px' }} />
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
            <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '1.5rem', borderRadius: '20px', display: 'inline-block', marginBottom: '1.5rem' }}>
              <Briefcase size={48} style={{ color: 'var(--primary)' }} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--secondary)' }}>No Jobs Posted Yet</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 2rem' }}>
              You haven't posted any jobs. Create your first job posting to start receiving applications from top candidates.
            </p>
            <button className="btn-primary" onClick={() => { setIsEditing(false); resetForm(); setShowModal(true); }} style={{ padding: '0.75rem 2rem' }}>Create First Job</button>
          </div>
        ) : jobs.map((job) => (
          <div key={job.positionId} className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', color: 'var(--secondary)' }}>{job.positionTitle}</h3>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button onClick={() => { setCurrentJob(job); setIsEditing(true); setShowModal(true); }} style={{ padding: '0.4rem', borderRadius: '6px', background: 'var(--background)', color: 'var(--text-main)' }}><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(job.positionId)} style={{ padding: '0.4rem', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><Trash2 size={14} /></button>
              </div>
            </div>
            
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {job.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="flex-center" style={{ gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <MapPin size={14} /> {job.location}
              </div>
              <div className="flex-center" style={{ gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Briefcase size={14} /> {job.experienceRequired}
              </div>
              <div className="flex-center" style={{ gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Users size={14} /> {job.openings} Openings
              </div>
            </div>

            <div style={{ 
              background: 'var(--background)', 
              padding: '0.5rem 1rem', 
              borderRadius: '8px', 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              color: 'var(--primary)',
              display: 'inline-block' 
            }}>
              {job.department?.departmentName || 'Unassigned'}
            </div>
          </div>
        ))}
      </div>

      {showModal && createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setShowModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="card" style={{ width: '100%', maxWidth: '600px', position: 'relative', zIndex: 1, maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem', border: 'none' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--secondary)' }}>{isEditing ? 'Edit Job Position' : 'Post New Job'}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Fill in the details to publish a new career opportunity.</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '50%', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Position Title</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <Briefcase size={18} />
                  </span>
                  <input 
                    type="text" required placeholder="e.g. Senior Software Engineer"
                    style={{ paddingLeft: '3rem', background: 'var(--background)', color: 'var(--text-main)', width: '100%', boxSizing: 'border-box' }}
                    value={currentJob.positionTitle} 
                    onChange={(e) => setCurrentJob({...currentJob, positionTitle: e.target.value})} 
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Location</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                      <MapPin size={18} />
                    </span>
                    <input 
                      type="text" required placeholder="e.g. Remote, New York"
                      style={{ paddingLeft: '3rem', background: 'var(--background)', color: 'var(--text-main)', width: '100%', boxSizing: 'border-box' }}
                      value={currentJob.location} 
                      onChange={(e) => setCurrentJob({...currentJob, location: e.target.value})} 
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Experience Required</label>
                  <input 
                    type="text" required placeholder="e.g. 3-5 Years"
                    style={{ background: 'var(--background)', color: 'var(--text-main)', width: '100%', boxSizing: 'border-box' }}
                    value={currentJob.experienceRequired} 
                    onChange={(e) => setCurrentJob({...currentJob, experienceRequired: e.target.value})} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Number of Openings</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                      <Users size={18} />
                    </span>
                    <input 
                      type="number" min="1" required 
                      style={{ paddingLeft: '3rem', background: 'var(--background)', color: 'var(--text-main)', width: '100%', boxSizing: 'border-box' }}
                      value={currentJob.openings} 
                      onChange={(e) => setCurrentJob({...currentJob, openings: parseInt(e.target.value)})} 
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Department</label>
                  <select 
                    required 
                    style={{ background: 'var(--background)', color: 'var(--text-main)', width: '100%', boxSizing: 'border-box' }}
                    value={currentJob.department?.departmentId} 
                    onChange={(e) => setCurrentJob({...currentJob, department: { departmentId: parseInt(e.target.value) || '' }})}
                  >
                    <option value="" disabled>Select Department</option>
                    {departments.map(d => <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Job Description</label>
                <textarea 
                  rows="5" required placeholder="Describe the responsibilities, requirements, and benefits..."
                  style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', outline: 'none', background: 'var(--background)', color: 'var(--text-main)', resize: 'vertical', boxSizing: 'border-box' }}
                  value={currentJob.description} 
                  onChange={(e) => setCurrentJob({...currentJob, description: e.target.value})}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius)', fontWeight: 600, background: 'var(--background)', color: 'var(--text-main)', border: '1px solid var(--border)' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {submitting ? 'Processing...' : (isEditing ? 'Save Changes' : 'Publish Job')}
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

export default ManageJobs;
