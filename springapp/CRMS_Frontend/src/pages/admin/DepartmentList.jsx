import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Building2, Mail, Phone } from 'lucide-react';
import DepartmentService from '../../services/DepartmentService';
import { useToast } from '../../context/ToastContext';
import { motion } from 'framer-motion';

const DepartmentList = () => {
  const { showToast } = useToast();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentDept, setCurrentDept] = useState({ departmentName: '', contactEmail: '', contactPhone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const data = await DepartmentService.getAll();
      setDepartments(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditing) {
        await DepartmentService.update(currentDept.departmentId, currentDept);
      } else {
        await DepartmentService.create(currentDept);
      }
      setShowModal(false);
      setCurrentDept({ departmentName: '', contactEmail: '', contactPhone: '' });
      fetchDepartments();
      showToast(isEditing ? 'Department updated successfully!' : 'Department created successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to save department. ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await DepartmentService.delete(id);
        fetchDepartments();
        showToast('Department deleted successfully!');
      } catch (err) {
        console.error(err);
        showToast('Failed to delete department. It might be linked to active jobs.', 'error');
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem' }}>Departments</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage your organization's academic and operational units.</p>
        </div>
        <button 
          onClick={() => { setIsEditing(false); setCurrentDept({ departmentName: '', contactEmail: '', contactPhone: '' }); setShowModal(true); }}
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} /> Add Department
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search departments..." style={{ paddingLeft: '3rem', maxWidth: '400px' }} />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Department Name</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Contact Info</th>
              <th style={{ textAlign: 'right', padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading...</td></tr>
            ) : departments.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No departments found.</td></tr>
            ) : departments.map((dept) => (
              <tr key={dept.departmentId} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>#{dept.departmentId}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: dept.departmentName ? 'var(--secondary)' : 'var(--text-muted)' }}>
                  {dept.departmentName || 'Unnamed Department'}
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={14} /> {dept.contactEmail || 'N/A'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Phone size={14} /> {dept.contactPhone || 'N/A'}
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => { setCurrentDept(dept); setIsEditing(true); setShowModal(true); }}
                      style={{ padding: '0.5rem', borderRadius: '8px', background: 'var(--background)', color: 'var(--primary)', border: '1px solid var(--border)' }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(dept.departmentId)}
                      style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setShowModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="card" style={{ width: '100%', maxWidth: '500px', position: 'relative', zIndex: 1, padding: '2.5rem', maxHeight: '90vh', overflowY: 'auto', border: 'none' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--secondary)' }}>{isEditing ? 'Edit Department' : 'Add Department'}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Provide the details for this department.</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '50%', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Department Name</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <Building2 size={18} />
                  </span>
                  <input 
                    type="text" required placeholder="e.g. Computer Science, Engineering"
                    style={{ paddingLeft: '3rem', background: 'var(--background)', color: 'var(--text-main)' }}
                    value={currentDept.departmentName} 
                    onChange={(e) => setCurrentDept({...currentDept, departmentName: e.target.value})} 
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Contact Email</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <Mail size={18} />
                  </span>
                  <input 
                    type="email" required placeholder="e.g. dept@university.edu"
                    style={{ paddingLeft: '3rem', background: 'var(--background)', color: 'var(--text-main)' }}
                    value={currentDept.contactEmail} 
                    onChange={(e) => setCurrentDept({...currentDept, contactEmail: e.target.value})} 
                  />
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Contact Phone</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <Phone size={18} />
                  </span>
                  <input 
                    type="text" required placeholder="e.g. +1 234 567 890"
                    style={{ paddingLeft: '3rem', background: 'var(--background)', color: 'var(--text-main)' }}
                    value={currentDept.contactPhone} 
                    onChange={(e) => setCurrentDept({...currentDept, contactPhone: e.target.value})} 
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius)', fontWeight: 600, background: 'var(--background)', color: 'var(--text-main)', border: '1px solid var(--border)' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {submitting ? 'Processing...' : (isEditing ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
