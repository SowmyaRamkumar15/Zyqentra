import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain alphabets, numbers, and special characters');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:8080/api/auth/reset-password', { 
        token, 
        newPassword: password 
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Link may be expired.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="page-center" style={{ background: 'var(--background)', padding: '2rem' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card" style={{ width: '100%', maxWidth: '500px', padding: '3.5rem', textAlign: 'center', border: 'none' }}>
          <div className="flex-center" style={{ background: 'rgba(16, 185, 129, 0.1)', width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 2rem', color: '#10b981' }}>
            <CheckCircle size={48} />
          </div>
          <h2 style={{ fontSize: '1.875rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Password Reset!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your password has been successfully reset. Redirecting you to login...</p>
          <Link to="/login" className="btn-primary" style={{ display: 'inline-block', width: '100%' }}>Go to Login</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-center" style={{ background: 'var(--background)', padding: '2rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ width: '100%', maxWidth: '500px', padding: '3.5rem', margin: 'auto', border: 'none' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="flex-center" style={{ background: 'var(--primary)', width: '60px', height: '60px', borderRadius: '15px', margin: '0 auto 1.5rem', color: 'white' }}>
            <Lock size={32} />
          </div>
          <h2 style={{ fontSize: '1.875rem', color: 'var(--secondary)' }}>Set New Password</h2>
          <p style={{ color: 'var(--text-muted)' }}>Enter your new secure password below.</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-main)' }}>New Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={18} />
              </span>
              <input type="password" style={{ paddingLeft: '3rem', background: 'var(--background)', color: 'var(--text-main)' }} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-main)' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={18} />
              </span>
              <input type="password" style={{ paddingLeft: '3rem', background: 'var(--background)', color: 'var(--text-main)' }} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading || !token}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        {!token && (
          <div style={{ marginTop: '1.5rem', color: '#ef4444', fontSize: '0.875rem', textAlign: 'center' }}>
            Invalid reset link. Missing token.
          </div>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Log In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
