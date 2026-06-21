import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Bell, HelpCircle, Home, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="glass" style={{
      height: '72px',
      padding: '0.75rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'var(--glass)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img src={logo} alt="Zyqentra Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--secondary)' }}>Zyqentra</span>
        </Link>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
            <Home size={18} /> Home
          </Link>
          <Link to="/help" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
            <HelpCircle size={18} /> Help
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={toggleTheme}
          style={{ 
            background: 'var(--primary-light)', 
            color: 'var(--primary)', 
            width: '40px', 
            height: '40px', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {!user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/login" style={{ color: 'var(--text-main)', fontWeight: 600, textDecoration: 'none', padding: '0.5rem 1rem' }}>Login</Link>
            <Link to="/register" className="btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '10px' }}>Get Started</Link>
          </div>
        ) : (
          <>
            <button style={{ background: 'transparent', color: 'var(--text-muted)', position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid var(--surface)' }}></span>
            </button>
            
            <div style={{ height: '24px', width: '1px', background: 'var(--border)' }}></div>

            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem', paddingLeft: '0.75rem', background: 'var(--background)', borderRadius: '50px', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--secondary)' }}>{user.username}</div>
                <div style={{ color: 'var(--primary)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>{user.role.replace('ROLE_', '')}</div>
              </div>
              <div className="flex-center" style={{ 
                background: 'var(--primary)', 
                color: 'white', 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)'
              }}>
                <User size={16} />
              </div>
            </Link>
            <button 
              onClick={handleLogout} 
              style={{ background: 'transparent', color: '#ef4444', marginLeft: '0.25rem', padding: '0.4rem' }}
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
