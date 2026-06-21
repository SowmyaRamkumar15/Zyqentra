import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Phone, Mail, Save } from 'lucide-react';
import UserService from '../services/UserService';
import { useToast } from '../context/ToastContext';

const Settings = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      setFormData({
        username: user.username || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = await UserService.update(currentUser.userId, {
        ...currentUser,
        username: formData.username,
        phoneNumber: formData.phoneNumber
      });
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      showToast('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to update profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return <div style={{ padding: '2rem' }}>Loading settings...</div>;

  return (
    <div className="animate-fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px' }}>
          <SettingsIcon size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem', color: 'var(--secondary)' }}>Settings</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your account preferences and profile information.</p>
        </div>
      </header>

      <div className="card" style={{ maxWidth: '600px', padding: '2rem' }}>
        <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
          <User size={20} /> Personal Information
        </h3>

        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <User size={18} />
              </span>
              <input 
                type="text" 
                required
                style={{ paddingLeft: '3rem', background: 'var(--background)', color: 'var(--text-main)' }}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={18} />
              </span>
              <input 
                type="email" 
                disabled 
                style={{ paddingLeft: '3rem', background: 'var(--background)', cursor: 'not-allowed', color: 'var(--text-muted)', opacity: 0.7 }} 
                value={currentUser.email} 
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Email cannot be changed for security reasons.</p>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Phone Number</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Phone size={18} />
              </span>
              <input 
                type="tel" 
                style={{ paddingLeft: '3rem', background: 'var(--background)', color: 'var(--text-main)' }}
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="e.g. +1 (555) 000-0000"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '48px' }}
          >
            {loading ? 'Saving Changes...' : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
