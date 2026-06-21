import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Briefcase, Users, FileText, Settings, HelpCircle, MessageSquare } from 'lucide-react';

const Sidebar = ({ role }) => {
  const adminLinks = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/departments', icon: <Building2 size={20} />, label: 'Departments' },
    { to: '/admin/jobs', icon: <Briefcase size={20} />, label: 'Job Openings' },
    { to: '/admin/applications', icon: <FileText size={20} />, label: 'Applications' },
    { to: '/admin/feedbacks', icon: <MessageSquare size={20} />, label: 'Feedbacks' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'User Management' },
  ];

  const studentLinks = [
    { to: '/student', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { to: '/student/jobs', icon: <Briefcase size={20} />, label: 'Find Jobs' },
    { to: '/student/applications', icon: <FileText size={20} />, label: 'My Applications' },
  ];

  const recruiterLinks = [
    { to: '/recruiter', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/recruiter/jobs', icon: <Briefcase size={20} />, label: 'Manage Jobs' },
    { to: '/recruiter/candidates', icon: <Users size={20} />, label: 'Candidates' },
    { to: '/recruiter/interviews', icon: <MessageSquare size={20} />, label: 'Interviews' },
  ];

  const links = role === 'ROLE_ADMIN' ? adminLinks :
    role === 'ROLE_RECRUITER' ? recruiterLinks :
      studentLinks;

  return (
    <aside className="glass" style={{
      width: '260px',
      height: 'calc(100vh - 72px)',
      position: 'sticky',
      top: '72px',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      borderRight: '1px solid var(--border)'
    }}>
      <div style={{ padding: '0 1rem 1rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Main Menu
      </div>

      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/admin' || link.to === '/student'}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            color: isActive ? 'var(--primary)' : 'var(--text-main)',
            background: isActive ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
            fontWeight: isActive ? 600 : 500,
            transition: 'all 0.2s'
          })}
        >
          {link.icon}
          {link.label}
        </NavLink>
      ))}

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ padding: '0 1rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
          General
        </div>
        <NavLink to="/settings" className="flex-center" style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', gap: '0.75rem', color: 'var(--text-muted)' }}>
          <Settings size={20} /> Settings
        </NavLink>
        <NavLink to="/help" className="flex-center" style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', gap: '0.75rem', color: 'var(--text-muted)' }}>
          <HelpCircle size={20} /> Help Center
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
