import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle, Target, Users, Briefcase, 
  Zap, Shield, Star, Globe, Award, Rocket, BarChart 
} from 'lucide-react';

const Home = () => {
  return (
    <div style={{ overflowX: 'hidden', background: 'var(--background)', transition: 'background 0.3s ease' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem',
        background: 'radial-gradient(circle at 80% 20%, var(--primary-light) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 50%)',
      }}>
        {/* Abstract Background Shapes */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          <motion.div 
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ position: 'absolute', top: '15%', right: '10%', width: '400px', height: '400px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(80px)' }}
          />
          <motion.div 
            animate={{ y: [0, 40, 0], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 12, repeat: Infinity }}
            style={{ position: 'absolute', bottom: '15%', left: '5%', width: '350px', height: '350px', background: 'var(--accent)', borderRadius: '50%', filter: 'blur(100px)' }}
          />
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.6rem 1.25rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 700, marginBottom: '2rem', border: '1px solid var(--border)' }}>
                <Rocket size={18} /> Next-Gen Placement Solution
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 850, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em', color: 'var(--secondary)' }}>
                Unlock Your <br />
                <span style={{ 
                  background: 'linear-gradient(135deg, var(--primary) 0%, #9333ea 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>Professional Future</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '600px' }}>
                Zyqentra is the enterprise-grade ecosystem that synchronizes students, departments, and corporate partners. Elevate your campus recruitment strategy today.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <Link to="/register" className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  Join the Platform <ArrowRight size={20} />
                </Link>
                <Link to="/login" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem', fontWeight: 700, borderRadius: '14px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--secondary)' }}>
                  Sign In
                </Link>
              </div>
              <div style={{ marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--surface)', background: 'var(--border)', marginLeft: i > 1 ? '-12px' : 0, overflow: 'hidden' }}>
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span style={{ fontWeight: 800, color: 'var(--secondary)' }}>2.5k+</span> students already placed
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ position: 'relative', display: 'none', lg: 'block' }}
            >
              <div style={{ 
                background: 'var(--surface)', 
                borderRadius: '30px', 
                padding: '2rem', 
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border)',
                position: 'relative',
                zIndex: 2
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <div style={{ width: '120px', height: '12px', background: 'var(--background)', borderRadius: '10px' }}></div>
                  <div style={{ width: '30px', height: '12px', background: 'var(--accent)', borderRadius: '10px' }}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', background: 'var(--background)', borderRadius: '12px' }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ width: '60%', height: '10px', background: 'var(--border)', borderRadius: '5px', marginBottom: '0.5rem' }}></div>
                        <div style={{ width: '40%', height: '8px', background: 'var(--background)', borderRadius: '5px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'var(--surface)', padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow)', zIndex: 3, border: '1px solid var(--border)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#10b981', color: 'white', padding: '0.5rem', borderRadius: '10px' }}><CheckCircle size={20} /></div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--secondary)' }}>Success Rate</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>98.2% Placed</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ padding: '6rem 2rem', background: 'var(--background)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4rem' }}>Strategic Corporate Partners</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap', filter: 'grayscale(1)', opacity: 0.6 }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--text-muted)' }}>MICROSOFT</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--text-muted)' }}>GOOGLE</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--text-muted)' }}>AMAZON</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--text-muted)' }}>META</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--text-muted)' }}>ADOBE</div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section style={{ padding: '10rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 850, marginBottom: '1.5rem', color: 'var(--secondary)' }}>One Platform, Endless Potential</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>Our multi-layered architecture serves students, university departments, and corporate recruiters with precision.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {[
              { icon: <Target color="var(--primary)" />, title: 'Precision Matching', desc: 'Our algorithms connect students with job roles that perfectly align with their skills and department background.' },
              { icon: <Globe color="#10b981" />, title: 'Global Opportunities', desc: 'Access exclusive job postings from top-tier companies worldwide, directly within your campus ecosystem.' },
              { icon: <BarChart color="#f59e0b" />, title: 'Real-time Analytics', desc: 'Departments get comprehensive insights into placement trends, student performance, and hiring success.' }
            ].map((sol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                style={{ padding: '3rem', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div style={{ marginBottom: '2rem' }}>{sol.icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--secondary)' }}>{sol.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{sol.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section style={{ padding: '10rem 2rem', background: 'var(--background)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '0.1em' }}>Seamless Integration</div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--secondary)' }}>How Zyqentra Works</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>A powerful 3-step process to transform campus hiring for everyone involved.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', position: 'relative' }}>
            {/* Connection Line (Desktop) */}
            <div style={{ position: 'absolute', top: '25%', left: '15%', right: '15%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--border), transparent)', zIndex: 0, display: 'none', lg: 'block' }}></div>

            {[
              { 
                step: '01', 
                title: 'Platform Onboarding', 
                desc: 'Students and departments register on our verified ecosystem with single sign-on (SSO) integration.',
                icon: <Users size={32} />
              },
              { 
                step: '02', 
                title: 'Smart Matching', 
                desc: 'Recruiters post positions, and our algorithm matches the best talent based on skills and department data.',
                icon: <Target size={32} />
              },
              { 
                step: '03', 
                title: 'Instant Placement', 
                desc: 'Automated scheduling, feedback loops, and digital offer management complete the journey.',
                icon: <Award size={32} />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
              >
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'var(--surface)', 
                  borderRadius: '24px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 2rem',
                  boxShadow: 'var(--shadow)',
                  border: '1px solid var(--border)',
                  color: 'var(--primary)'
                }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>STEP {item.step}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--secondary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Experience Section */}
      <section style={{ padding: '10rem 2rem', position: 'relative', overflow: 'hidden', background: 'var(--background)' }}>
        {/* Animated Background Gradients */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '10%', right: '5%', width: '600px', height: '600px', background: 'var(--primary)', filter: 'blur(150px)', borderRadius: '50%' }} />
          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '700px', height: '700px', background: 'var(--accent)', filter: 'blur(150px)', borderRadius: '50%' }} />
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            
            {/* Left Content Area */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div style={{ display: 'inline-block', padding: '0.6rem 1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--primary)', borderRadius: '50px', fontWeight: 800, fontSize: '0.85rem', marginBottom: '2rem', letterSpacing: '0.05em', boxShadow: 'var(--shadow-sm)' }}>
                ✨ REVOLUTIONIZING RECRUITMENT
              </div>
              <h2 style={{ fontSize: 'clamp(3rem, 4vw, 4rem)', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.1, color: 'var(--secondary)', letterSpacing: '-0.03em' }}>
                Transforming the <br /> 
                <span style={{ 
                  background: 'linear-gradient(135deg, var(--primary) 0%, #9333ea 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>Placement Experience</span>
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
                {[
                  { title: 'Empowering Students', desc: 'Personalized dashboards, instant job alerts, and real-time application tracking.', icon: <Users size={24} />, color: 'var(--primary)' },
                  { title: 'Streamlining Departments', desc: 'One-click student verifications and comprehensive placement analytics.', icon: <Shield size={24} />, color: '#10b981' },
                  { title: 'Equipping Recruiters', desc: 'Direct access to verified top talent with automated interview scheduling.', icon: <Briefcase size={24} />, color: '#f59e0b' }
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, width: '60px', height: '60px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, boxShadow: 'var(--shadow-sm)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--secondary)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1.05rem', maxWidth: '400px' }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual Area (Glassmorphism & Floating UI) */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              {/* Main Glass Panel */}
              <div style={{ 
                position: 'relative',
                width: '100%',
                height: '500px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '40px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                zIndex: 2
              }}>
                {/* Decorative Inner Gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)' }}></div>
                
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 3 }}>
                  <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                    <Briefcase size={140} color="var(--primary)" style={{ opacity: 0.9, filter: 'drop-shadow(0 20px 30px rgba(79, 70, 229, 0.3))' }} />
                  </motion.div>
                </div>
              </div>

              {/* Floating Stat Card 1 */}
              <motion.div 
                animate={{ y: [-15, 15, -15] }} 
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '10%', left: '-10%', background: 'var(--surface)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <div style={{ background: '#10b981', padding: '0.75rem', borderRadius: '12px', color: 'white' }}><CheckCircle size={24} /></div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--secondary)' }}>98%</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Satisfaction Rate</div>
                </div>
              </motion.div>

              {/* Floating Stat Card 2 */}
              <motion.div 
                animate={{ y: [15, -15, 15] }} 
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{ position: 'absolute', bottom: '15%', right: '-15%', background: 'var(--surface)', padding: '1.5rem 2rem', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', zIndex: 3, textAlign: 'center' }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.25rem' }}>10k+</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Placements Secured</div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '10rem 2rem', textAlign: 'center', background: 'var(--background)' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50px', fontWeight: 700, fontSize: '0.8rem', marginBottom: '2rem' }}>READY TO START?</div>
          <h2 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--secondary)' }}>Build your talent pipeline <br /> <span style={{ color: 'var(--primary)' }}>with Zyqentra</span></h2>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem' }}>Empowering institutions and corporate partners with state-of-the-art recruitment tools.</p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/register" 
              className="btn-primary" 
              style={{ 
                padding: '1.5rem 4rem', 
                fontSize: '1.25rem', 
                borderRadius: '18px', 
                boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              Get Started Free <ArrowRight size={22} />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
