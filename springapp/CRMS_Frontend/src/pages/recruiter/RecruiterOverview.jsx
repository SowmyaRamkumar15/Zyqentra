import { Users, Briefcase, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const RecruiterOverview = () => {
  const stats = [
    { title: 'Active Jobs', value: '12', icon: <Briefcase size={24} />, color: 'var(--primary)' },
    { title: 'Total Applications', value: '345', icon: <FileText size={24} />, color: 'var(--secondary)' },
    { title: 'Shortlisted', value: '48', icon: <Users size={24} />, color: '#10b981' },
    { title: 'Hired', value: '15', icon: <CheckCircle size={24} />, color: '#f59e0b' }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>Dashboard Overview</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
            style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
          >
            <div style={{ background: `${stat.color}15`, color: stat.color, padding: '1rem', borderRadius: '12px' }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{stat.title}</p>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Recent Applications</h3>
        <p style={{ color: 'var(--text-muted)' }}>You will be able to see recent applications and AI rankings here.</p>
      </div>
    </div>
  );
};

export default RecruiterOverview;
