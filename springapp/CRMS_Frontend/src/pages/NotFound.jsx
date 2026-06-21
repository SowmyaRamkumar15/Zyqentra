import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', textAlign: 'center', padding: '2rem' }}>
      <div style={{ color: '#ef4444', marginBottom: '1.5rem' }}>
        <AlertCircle size={80} />
      </div>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '1.5rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '2.5rem' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Home size={18} /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
