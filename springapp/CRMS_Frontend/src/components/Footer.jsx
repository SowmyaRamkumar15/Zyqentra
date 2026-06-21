import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/student');

  if (isDashboard) {
    return (
      <footer style={{ 
        marginTop: 'auto', 
        padding: '1rem 2rem', 
        borderTop: '1px solid var(--border)',
        background: 'var(--background)',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
          © {currentYear} Zyqentra Enterprise.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/help" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Status</Link>
          <Link to="/help" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Privacy</Link>
          <Link to="/help" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Terms</Link>
        </div>
      </footer>
    );
  }

  return (
    <footer style={{ 
      marginTop: 'auto', 
      padding: '4rem 2rem 2rem', 
      borderTop: '1px solid var(--border)',
      background: 'var(--background)'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '3rem',
        marginBottom: '4rem'
      }}>
        {/* Company Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <img src={logo} alt="Zyqentra Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--secondary)' }}>Zyqentra</span>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '1rem' }}>
            The world's most advanced recruitment platform for modern educational institutions.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <a key={i} href="#" style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '10px', 
                background: 'var(--surface)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--text-muted)',
                transition: 'all 0.3s',
                border: '1px solid var(--border)'
              }} onMouseOver={(e) => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.background = 'var(--background)'; }} onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'var(--surface)'; }}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: 'var(--secondary)' }}>Platform</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>Home</Link></li>
            <li><Link to="/student/jobs" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>Job Board</Link></li>
            <li><Link to="/help" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>Help Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: 'var(--secondary)' }}>Contact</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <Mail size={16} /> demodemocrms@gmail.com
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <Phone size={16} /> 9123456789
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <MapPin size={16} /> coimbatore
            </li>
          </ul>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        paddingTop: '2rem', 
        borderTop: '1px solid var(--border)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          © {currentYear} Zyqentra Enterprise. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/help" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Privacy Policy</Link>
          <Link to="/help" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
