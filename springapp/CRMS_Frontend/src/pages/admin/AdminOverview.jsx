import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Briefcase, Users, FileCheck, TrendingUp, Calendar, ArrowRight, User } from 'lucide-react';
import DashboardService from '../../services/DashboardService';

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await DashboardService.getAdminStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats ? [
    { label: 'Departments', value: stats.totalDepartments, icon: <Building2 />, color: '#4f46e5', delay: 0, path: '/admin/departments' },
    { label: 'Job Positions', value: stats.totalJobs, icon: <Briefcase />, color: '#10b981', delay: 0.1, path: '/admin/jobs' },
    { label: 'Applications', value: stats.totalApplications, icon: <FileCheck />, color: '#f59e0b', delay: 0.2, path: '/admin/applications' },
    { label: 'Total Users', value: stats.totalUsers, icon: <Users />, color: '#ec4899', delay: 0.3, path: '/admin/users' },
  ] : [];

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Admin Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Welcome to the command center. Here's your recruitment status.</p>
        </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid var(--border)' }}>
            <Calendar size={18} /> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {loading ? (
            [1, 2, 3, 4].map(i => <div key={i} className="card" style={{ height: '100px' }}></div>)
          ) : statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay }}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              onClick={() => navigate(stat.path)}
              className="card glass"
              style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', border: 'none', cursor: 'pointer' }}
            >
              <div style={{
                background: `${stat.color}15`,
                color: stat.color,
                padding: '1.25rem',
                borderRadius: '16px'
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--secondary)' }}>{stat.value}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.025em' }}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="card" style={{ border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Application Velocity</h3>
              <div style={{ padding: '0.4rem 0.8rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800 }}>AI PREDICTION</div>
            </div>
            
            {/* Simulated Chart */}
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '2rem' }}>
              {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                  style={{ 
                    flex: 1, 
                    background: i === 6 ? 'var(--primary)' : 'var(--primary-light)', 
                    borderRadius: '8px',
                    position: 'relative'
                  }}
                >
                  {i === 6 && <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 800 }}>+12%</div>}
                </motion.div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="card" style={{ background: 'var(--gradient-blue)', color: 'white', border: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            <TrendingUp size={48} style={{ marginBottom: '2rem', color: 'white', opacity: 0.8 }} />
            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>AI Placement Insights</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.6, fontWeight: 500 }}>
              Our AI analysis suggests a <span style={{ fontWeight: 800, textDecoration: 'underline' }}>high probability</span> of meeting your placement targets this quarter.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '1.25rem', borderRadius: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>98%</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Confidence</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '1.25rem', borderRadius: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>8 Days</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Avg. Fill Time</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="card" style={{ border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Recent Activity</h3>
            <button style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.875rem', background: 'none' }}>View All History</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {loading ? (
              <p>Loading activity...</p>
            ) : !stats?.recentApplications?.length ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No recent applications yet.</p>
            ) : stats.recentApplications.slice(0, 3).map((app, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', borderRadius: '20px', background: 'var(--background)', border: '1px solid var(--border)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '15px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: 'var(--shadow-sm)' }}>
                  <User size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{app.candidate?.username}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>applied for <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{app.jobPosition?.positionTitle}</span></div>
                  <div style={{ marginTop: '0.75rem' }} className={`badge ${app.status === 'Accepted' ? 'badge-success' : app.status === 'Rejected' ? 'badge-error' : 'badge-primary'}`}>{app.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default AdminOverview;
