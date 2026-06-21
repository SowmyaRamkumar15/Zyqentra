import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, Clock, ArrowRight, Star, TrendingUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardService from '../../services/DashboardService';

const StudentOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      // Using 0 as departmentId if not found (made optional in backend)
      const res = await DashboardService.getStudentStats(user.userId, 0);
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Eligible Jobs', value: data?.eligibleJobs?.length || 0, icon: <Star size={24} />, color: 'var(--primary)', bg: 'var(--primary)15' },
    { label: 'My Applications', value: data?.appliedJobs?.length || 0, icon: <Briefcase size={24} />, color: 'var(--accent)', bg: 'var(--accent)15' },
    { label: 'Feedbacks', value: data?.feedbacks?.length || 0, icon: <MessageSquare size={24} />, color: '#10b981', bg: '#10b98115' },
  ];

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Student Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Welcome back! Here's an overview of your recruitment journey.</p>
        </div>
        <button 
          onClick={() => alert('Feature coming soon: Direct chat with recruitment experts.')}
          style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '12px', 
            fontWeight: 700, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--text-main)'
          }}
        >
          <MessageSquare size={18} style={{ color: 'var(--primary)' }} /> Connect with Recruiter
        </button>
      </header>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }} 
            className="card glass" 
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', border: 'none', cursor: 'pointer' }}
          >
            <div style={{ background: stat.bg, color: stat.color, padding: '1.25rem', borderRadius: '16px' }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--secondary)' }}>{loading ? '...' : stat.value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="card" style={{ border: 'none' }}>
              <h3 style={{ marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)' }}>Profile Completion</h3>
              <div style={{ height: '12px', background: 'var(--background)', borderRadius: '10px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '85%' }} 
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{ height: '100%', background: 'var(--gradient-blue)' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '250px' }}>
                  Your profile is almost there! Complete it to unlock better job recommendations.
                </p>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>85%</div>
              </div>
              <Link to="/profile" className="btn-primary" style={{ width: '100%', borderRadius: '12px', padding: '1rem', textAlign: 'center', textDecoration: 'none', display: 'block' }}>Enhance Profile</Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="card" style={{ border: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)' }}>Top Eligible Jobs</h3>
                <Link to="/student/jobs" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  View All <ArrowRight size={16} />
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {loading ? (
                  <p style={{ color: 'var(--text-muted)' }}>Finding best matches...</p>
                ) : !data?.eligibleJobs?.length ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No matching jobs found for your profile.</p>
                ) : data.eligibleJobs.slice(0, 3).map((job, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--background)' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--secondary)' }}>{job.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{job.company?.companyName || 'Campus Partner'} • {job.location}</div>
                    </div>
                    <Link to="/student/jobs" style={{ padding: '0.5rem', background: 'var(--surface)', borderRadius: '8px', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <aside>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="card" style={{ border: 'none', height: '100%' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--secondary)' }}>Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { time: '2 hours ago', action: 'Applied for Software Developer role at TechCorp', type: 'application' },
                { time: 'Yesterday', action: 'Profile score increased to 85%', type: 'profile' },
                { time: '2 days ago', action: 'Received feedback for Java Backend position', type: 'feedback' },
                { time: '3 days ago', action: 'Verified skills: Java, Spring Boot, React', type: 'skill' }
              ].map((activity, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flexShrink: 0, width: '2px', background: 'var(--border)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: i === 0 ? 'var(--primary)' : 'var(--text-muted)' }}></div>
                  </div>
                  <div style={{ paddingBottom: i === 3 ? 0 : '1.5rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>{activity.time}</div>
                    <div style={{ fontSize: '0.875rem', lineHeight: 1.4, color: 'var(--text-main)' }}>{activity.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  );
};

export default StudentOverview;
