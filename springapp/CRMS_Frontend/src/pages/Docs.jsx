import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Target, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Docs = () => {
  const sections = [
    {
      title: "Getting Started",
      icon: <BookOpen size={24} style={{ color: 'var(--primary)' }} />,
      content: "Welcome to Zyqentra! To begin, register as a student and complete your profile. Recruiters and Placement Officers are usually onboarded by the administration. Make sure your email and phone number are up to date."
    },
    {
      title: "Student Portal Guide",
      icon: <Users size={24} style={{ color: '#10b981' }} />,
      content: "Once logged in, the Student Dashboard gives you an overview of upcoming drives and application statuses. Navigate to 'Job Board' to find open positions, and use 'My Applications' to track your progress."
    },
    {
      title: "Recruiter Operations",
      icon: <Target size={24} style={{ color: '#f59e0b' }} />,
      content: "Recruiters can post job listings, specify required skills and criteria, and track applicants. You can filter candidates based on academic performance, schedule interviews, and provide immediate feedback directly through the platform."
    },
    {
      title: "Placement Officer Tools",
      icon: <Shield size={24} style={{ color: '#ec4899' }} />,
      content: "As an admin, you have a bird's-eye view of all recruitment activities. You can manage student data, verify company profiles, and approve job postings. The dashboard provides real-time statistics on placement success rates."
    },
    {
      title: "System Integrations",
      icon: <Layers size={24} style={{ color: '#8b5cf6' }} />,
      content: "Zyqentra supports seamless integrations with various third-party tools, including single sign-on (SSO) via Google, automated email notifications for interview updates, and comprehensive data export capabilities for department reports."
    }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <Link to="/help" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, marginBottom: '1.5rem' }}>
          <ArrowLeft size={18} /> Back to Help Center
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>Zyqentra Documentation</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Everything you need to know to use our platform effectively.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {sections.map((section, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card" 
            style={{ padding: '2rem', display: 'flex', gap: '1.5rem', border: '1px solid var(--border)' }}
          >
            <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '12px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
              {section.icon}
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 700 }}>{section.title}</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                {section.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--primary-light)', borderRadius: '20px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 800 }}>Need more details?</h3>
        <p style={{ color: 'var(--primary)', opacity: 0.8, marginBottom: '2rem' }}>If you couldn't find what you were looking for in our documentation, feel free to reach out to our support team.</p>
        <button onClick={() => window.location.href = "mailto:demodemocrms@gmail.com"} className="btn-primary" style={{ padding: '1rem 2rem' }}>
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Docs;
